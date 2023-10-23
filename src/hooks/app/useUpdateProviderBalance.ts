import config from "@/config/config";
import { useEffect, useRef } from "react";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";

export function useUpdateProviderBalance() {
  const { game } = useGameStore();
  const { account } = useAccountStore();
  const { getGameBalance } = useWalletStore();

  const handleUpdateProviderBalance = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !account.info.bankInfoAuthentication
    )
      return;

    // update provider's game balance
    game.providerList
      .filter((provider) => provider.status === 0 && provider.transferwallet)
      .filter(
        (provider) =>
          provider.abbreviation !== "NTTF" && provider.abbreviation !== "RTTF"
      )
      .map((a) => {
        getGameBalance(a.abbreviation);
      });
  };

  useEffect(() => {
    if (!account.token) return;

    handleUpdateProviderBalance();
  }, [JSON.stringify(game.providerList)]);

  return {
    handleUpdateProviderBalance,
  };
}
