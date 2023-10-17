import React, { ChangeEvent, useMemo } from "react";
import config from "@/config/config";
import Common from "@/utils/Common";
import { Provider } from "@/types/game";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { TransferWallet } from "@/components/_Share_Domain/Account/TransferPrev/components/TransferCard";
import i18n from "@/utils/i18n";
import { Select } from "@/components/UI/Select";

type Props = {
  value: string;
  handleChange: (e: ChangeEvent) => void;
  walletBalance: TransferWallet[];
  mainAccountId: string; // "0"
};

const WalletSelect = ({
  value,
  handleChange,
  walletBalance,
  mainAccountId,
}: Props) => {
  const { game } = useGameStore();

  const gpNameSwitcher = ({ abbreviation, name }: Provider) => {
    if (
      abbreviation &&
      abbreviation.toLowerCase() === "wgfm" &&
      config.brandName === "TIGER"
    )
      return "Tiger Sports";
    else return name ? name : "";
  };

  return (
    <Select native value={value} onChange={handleChange}>
      <option value={mainAccountId}>{i18n.t("transfer.mainAccount")}</option>
      {game.providerList
        .filter((provider) => provider.status === 0 && provider.transferwallet)
        .filter((provider) => {
          if (config.features.MergeEVORTNT) {
            if (
              !(
                provider.gpcode === "NTTF" ||
                provider.gpcode === "RTTF" ||
                provider.gpcode === "BTG" ||
                provider.gpcode === "NLC"
              )
            ) {
              return provider;
            }
          } else {
            return provider;
          }
        })
        .map((provider, index) => (
          <option value={provider.gpcode} key={index}>
            {gpNameSwitcher(provider)}
            {`(${walletBalance
              .filter(
                (transferWallet) =>
                  transferWallet.abbreviation === provider.abbreviation
              )
              .map((transferWallet) =>
                Common.formatNumberWithThousand(transferWallet.balance)
              )})`}
          </option>
        ))}
    </Select>
  );
};

export default WalletSelect;
