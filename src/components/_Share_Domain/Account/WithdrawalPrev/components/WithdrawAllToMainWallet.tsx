import React, { useState } from "react";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { themeList } from "@/theme";
import { Button } from "@/components/Mobile/components/UI/Button";

const theme = themeList["mobileT18"];

const CustomLabel = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-left: 3px;
  color: ${theme.white};
`;

const ButtonWrapper = styled.div`
  margin: 15px 0 0 0;
  display: flex;
`;

type Props = {
  label?: string;
  buttonText?: string;
};
const WithdrawAllToMainWallet = ({ label = "", buttonText = "" }: Props) => {
  const { game } = useGameStore();
  const { performWithdrawFromEveryBrand, getGameBalance } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);

  const getAllGameBalance = async () => {
    const promiseList = game.providerList
      .filter((provider) => provider.status === 0 && provider.transferwallet)
      .filter(
        (provider) =>
          provider.abbreviation !== "NTTF" && provider.abbreviation !== "RTTF"
      )
      .map((provider) => {
        return getGameBalance(provider.gpcode);
      });

    await Promise.all(promiseList);
  };

  const handleClick = async () => {
    setIsLoading(true);
    await performWithdrawFromEveryBrand();
    await getAllGameBalance();
    setIsLoading(false);
  };
  return (
    <>
      {label && <CustomLabel>{label}</CustomLabel>}
      {/*一键傳輸*/}
      <ButtonWrapper>
        <Button
          variant={"contained"}
          onClick={handleClick}
          color={"primary"}
          fullWidth
          disabled={isLoading}
        >
          {buttonText || i18n.t("transfer.oneKeyTransferAll")}
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default React.memo(WithdrawAllToMainWallet);
