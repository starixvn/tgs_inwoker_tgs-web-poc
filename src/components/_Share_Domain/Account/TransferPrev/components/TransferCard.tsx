import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import i18n from "@/utils/i18n";
import Common from "@/utils/Common";
import config from "@/config/config";
import styled from "styled-components";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import {
  LabelContainer,
  ItemContainer,
  Remark,
} from "@/components/Mobile/styles/forms";
import { Button } from "@/components/Mobile/components/UI/Button";
import { Select } from "@/components/Mobile/components/UI/Select";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import { FormControl as MuiFormControl, MenuItem } from "@material-ui/core";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { Provider } from "@/types/game";
import WalletSelect from "@/components/_Share_Domain/Account/TransferPrev/components/WalletSelect";
import { themeList } from "@/theme";
import { withStyles } from "@material-ui/core/styles";

const theme = themeList["mobileT18"];

const TransferCardContainer = styled.div`
  background: ${theme.primaryLight};
  color: ${theme.white};
  padding: 12px;
  & * {
    font-size: 15px !important;
  }

  input,
  input::placeholder {
    font-size: 15px !important;
    padding: 0;
  }
`;

const RowContainer = styled.div`
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColContainer = styled.div`
  width: 50%;
`;

const FormControl = withStyles(() => ({
  root: {
    borderRadius: "5px",
    border: `1px solid ${theme.tertiary}`,
    width: "100%",
    fontSize: "0.937rem",
    "& fieldset": {
      border: "none",
    },
  },
}))(MuiFormControl);

const Spacing = styled.div`
  margin-bottom: 10px;
`;

export interface TransferWallet {
  abbreviation: string;
  balance: number;
}

type Props = {
  fromWallet: string;
  handleChangeFromWallet: (e: ChangeEvent) => void;
  toWallet: string;
  handleChangeToWallet: (e: ChangeEvent) => void;
  transferAmount: string;
  handleChangeTransferAmount: (e: ChangeEvent) => void;
  mainAccountId: string; // "0",
  children: React.ReactElement;
};
const TransferCard = ({
  fromWallet,
  handleChangeFromWallet,
  toWallet,
  handleChangeToWallet,
  transferAmount,
  handleChangeTransferAmount,
  mainAccountId,
  children,
}: Props) => {
  const { wallet, getGameBalance } = useWalletStore();
  const { game } = useGameStore();
  const [transferWallets, setTransferWallets] = useState<TransferWallet[]>([]);

  const getAllGameBalance = useCallback(async () => {
    if (!game.providerList.length) return;

    const newWalletBalance: TransferWallet[] = [];
    const promiseList = game.providerList
      .filter(
        (provider) => provider.status === 0 && provider.transferwallet === true
      )
      .filter(
        (provider) => provider.gpcode !== "NTTF" && provider.gpcode !== "RTTF"
      )
      .map((provider) => {
        return getGameBalance(provider.gpcode).then((response) => {
          if (!response) {
            console.log(provider.gpcode);
          } else {
            if (response.IsSuccess) {
              newWalletBalance.push({
                abbreviation: provider.abbreviation,
                balance: response.data.balance,
              });
            }
          }
        });
      });

    await Promise.all(promiseList);
    setTransferWallets(newWalletBalance);
  }, [JSON.stringify(game.providerList)]);

  useEffect(() => {
    if (!game.providerList.length) return;

    getAllGameBalance().then();
  }, [game.providerList.length]);

  useEffect(() => {
    if (!wallet.transferResult?.IsSuccess) return;

    getAllGameBalance().then();
  }, [wallet.transferResult]);

  return (
    <TransferCardContainer>
      <RowContainer>
        <ColContainer>{i18n.t("transfer.mainAccount")}</ColContainer>

        <ColContainer>
          {Common.formatNumberWithCommas(wallet.mainBalance)}
        </ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("transfer.transferFromWallet")}</ColContainer>
        <ColContainer>
          <WalletSelect
            value={fromWallet}
            handleChange={handleChangeFromWallet}
            walletBalance={transferWallets}
            mainAccountId={mainAccountId}
          />
        </ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("transfer.transferToWallet")}</ColContainer>
        <ColContainer>
          <WalletSelect
            value={toWallet}
            handleChange={handleChangeToWallet}
            walletBalance={transferWallets}
            mainAccountId={mainAccountId}
          />
        </ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("common.amount")}</ColContainer>
        <ColContainer>
          <FormControl>
            <TextField
              type={"number"}
              placeholder={i18n.t("transfer.msgEnterAmount")}
              value={transferAmount}
              onChange={handleChangeTransferAmount}
              style={{ padding: "6.5px 8px" }}
            />
          </FormControl>
        </ColContainer>
      </RowContainer>

      <Spacing />

      {children}
    </TransferCardContainer>
  );
};

export default React.memo(TransferCard);
