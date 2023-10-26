import React, { FC, useState } from "react";
import styled, { keyframes, DefaultTheme } from "styled-components";
import DynamicFont from "react-dynamic-font";
import IconRefreshPNG from "@/assets/t18/images/account/icon-refresh.png";
import i18n from "@/utils/i18n";
import Common from "@/utils/Common";
import config from "@/config/config";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import Icon from "@/components/Icon";
import { media } from "@/theme/breakpoints";

const rotateKeyFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-359deg);
  }
`;

const Container = styled.div`
  padding: 22px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex-wrap: wrap;
`;

const PlayerInfoContainer = styled.div`
  ${media.md} {
    flex: 1;
    min-width: 184px;
  }
`;

const PlayerName = styled.div`
  font-size: 2rem;
  line-height: 2.343rem;
  font-weight: 500;
  color: ${({ theme }) => theme.white};
`;

const WalletsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;

  ${media.lg} {
    gap: 60px;
  }
`;

const MainWalletContainer = styled.div`
  width: 128px;
`;

const MainAccountLabel = styled.div<{ theme: DefaultTheme }>`
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245rem;
  color: ${({ theme }) => theme.white};
`;

const AmountContainer = styled.div<{ theme: DefaultTheme }>`
  font-size: 2.125rem;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  padding-top: 19px;

  & *:first-child {
    flex-grow: 1;
  }
`;

const RefreshButton = styled(Icon)`
  &:hover {
    cursor: pointer;
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

const VIPLabel = styled.div<{ theme: DefaultTheme }>`
  color: ${({ theme }) => {
    return theme.useBackgroundColor ? theme.useBackgroundColor : theme.primary;
  }};
  font-size: 1.625rem;
  margin-top: 11px;
  font-weight: 400;
`;

const UserWalletInfo = ({}) => {
  const { game } = useGameStore();
  const { wallet, updateBalanceList, getGameBalance } = useWalletStore();
  const { account } = useAccountStore();
  const info = account.info;
  const [isLoading, setIsLoading] = useState(false);

  const getAllGameBalance = async () => {
    const promiseList = game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => {
        return getGameBalance(a.gpcode);
      });

    await Promise.all(promiseList);
  };

  const handleRefreshClick = async () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    try {
      setIsLoading(true);
      await updateBalanceList();
      await getAllGameBalance();
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  let ingame = 0;
  game.providerList.map((provider) => {
    if (provider.transferwallet)
      ingame +=
        typeof provider.balance === "number"
          ? provider.balance
          : parseFloat(provider.balance);
  });

  return (
    <Container>
      <PlayerInfoContainer>
        <PlayerName>{info.member_username}</PlayerName>
        {config.features.HaveVIPFeature && (
          <VIPLabel>
            VIP
            {info.member_level_id}
          </VIPLabel>
        )}
      </PlayerInfoContainer>

      <WalletsWrapper>
        <MainWalletContainer>
          <MainAccountLabel>
            {i18n.t("web.account.header.mainWallet")}:
          </MainAccountLabel>
          <AmountContainer>
            {isLoading ? (
              <span>-</span>
            ) : (
              <DynamicFont
                content={
                  wallet.mainSymbol +
                  Common.formatNumberWithThousand(wallet.mainBalance)
                }
              />
            )}
            <RefreshButton
              width={"44px"}
              height={"44px"}
              iconUrl={IconRefreshPNG}
              onClick={handleRefreshClick}
            />
          </AmountContainer>
        </MainWalletContainer>
        {game.containTransferWallet && (
          <>
            <MainWalletContainer>
              <MainAccountLabel>
                {i18n.t("web.account.header.allGameWallet")}:
              </MainAccountLabel>
              <AmountContainer>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <DynamicFont
                    content={wallet.mainSymbol + ingame.toFixed(2)}
                  />
                )}
                <RefreshButton
                  width={"44px"}
                  height={"44px"}
                  iconUrl={IconRefreshPNG}
                  onClick={handleRefreshClick}
                />
              </AmountContainer>
            </MainWalletContainer>
          </>
        )}
        <MainWalletContainer>
          <MainAccountLabel>
            {i18n.t("web.account.header.total")}:
          </MainAccountLabel>
          <AmountContainer>
            {isLoading ? (
              <span>-</span>
            ) : (
              <DynamicFont
                content={
                  wallet.mainSymbol +
                  Common.formatNumberWithThousand(wallet.mainBalance + ingame)
                }
              />
            )}
            <RefreshButton
              width={"44px"}
              height={"44px"}
              iconUrl={IconRefreshPNG}
              onClick={handleRefreshClick}
            />
          </AmountContainer>
        </MainWalletContainer>
      </WalletsWrapper>
    </Container>
  );
};

export default UserWalletInfo;
