import { useSelector } from "react-redux";

export function useAccount() {
  //@ts-ignore
  const account = useSelector((state) => state.account);

  return {
    account,
  };
}
