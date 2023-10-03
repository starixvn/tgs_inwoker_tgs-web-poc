import React, { useCallback } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import { themeList } from "@/theme";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import Common from "@/utils/Common";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";

const theme = themeList["mobileT18"];

type BalanceTrackerContainerProps = {
  size?: "normal" | "small" | undefined;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  background: ${(props: BalanceTrackerContainerProps) =>
    props.size !== "small" ? theme.primaryDark : theme.tertiaryDark};
  border: ${(props: BalanceTrackerContainerProps) =>
    props.size !== "small" ? `1px solid ${theme.tertiary}` : "none"};
  color: white;
  border-radius: 10px;
  padding: ${(props: BalanceTrackerContainerProps) =>
    props.size !== "small" ? "10px" : "4px 10px"};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;

  & span {
    margin-right: 10px;
    white-space: nowrap;
  }
`;

const DepositButtonContainer = styled.div`
  background: linear-gradient(180deg, #922acf 0%, #2f26ad 100%);
  border-radius: 5px;
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DepositButton = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push("/deposit");
  }, []);
  return (
    <DepositButtonContainer>
      <AddIcon onClick={handleClick} />
    </DepositButtonContainer>
  );
};
type Props = {
  size?: "normal" | "small";
};
const BalanceTracker = ({ size, ...others }: Props) => {
  const { wallet } = useWalletStore();

  const currentBalance = `${
    wallet.mainSymbol
  }$ ${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const isShow = size !== "small";
  return (
    //@ts-ignore
    <BalanceTrackerContainer size={size} {...others}>
      {isShow && <span>{i18n.t("wap.main.account.totalFund")}</span>}

      <BalanceContainer>
        <span>{currentBalance}</span>
        <DepositButton />
      </BalanceContainer>
    </BalanceTrackerContainer>
  );
};

export default BalanceTracker;
