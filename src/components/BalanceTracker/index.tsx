import React, { useCallback } from "react";
import styled from "styled-components";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import Common from "@/utils/Common";
import i18n from "@/utils/i18n";
import RefreshButton from "@/components/BalanceTracker/components/RefreshButton";
import DepositButton from "@/components/BalanceTracker/components/DepositButton";

type BalanceTrackerContainerProps = {
  $size?: "normal" | "small" | undefined;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  background: ${({ $size, theme }: BalanceTrackerContainerProps) =>
    $size !== "small" ? theme.primaryDark : theme.tertiaryDark};
  border: ${({ $size, theme }: BalanceTrackerContainerProps) =>
    $size !== "small" ? `1px solid ${theme.tertiary}` : "none"};
  color: white;
  border-radius: 10px;
  padding: ${({ $size }: BalanceTrackerContainerProps) =>
    $size !== "small" ? "10px" : "4px 10px"};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.318rem;

  & span {
    margin-right: 10px;
    white-space: nowrap;
  }
`;

type Props = {
  size?: "normal" | "small";
};
const BalanceTracker = ({ size, ...others }: Props) => {
  const { wallet, getBalanceList } = useWalletStore();

  const currentBalance = `${
    wallet.mainSymbol
  }$ ${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, []);

  const isShow = size !== "small";
  return (
    //@ts-ignore
    <BalanceTrackerContainer $size={size} {...others}>
      {isShow && <span>{i18n.t("wap.main.account.totalFund")}</span>}

      <BalanceContainer>
        <span>{currentBalance}</span>
        {isShow && <RefreshButton handleClick={handleRefreshBalance} />}
        <DepositButton />
      </BalanceContainer>
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceTracker);
