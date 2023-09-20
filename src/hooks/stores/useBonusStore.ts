import { useSelector } from "react-redux";
import { AccountState } from "@/types/account";

export function useAccountStore() {
  //@ts-ignore
  const account: AccountState = useSelector((state) => state.account);

  return {
    account,
  };
}
