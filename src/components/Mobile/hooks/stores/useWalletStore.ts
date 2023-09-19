import { useSelector } from "react-redux";
import { GeneralState } from "@/types/general";
import { WalletState } from "@/types/wallet";

export function useWalletStore() {
  //@ts-ignore
  const wallet: WalletState = useSelector((state) => state.wallet);

  return {
    wallet,
  };
}
