import config from "@/config/config";
import { AppHistory } from "@/history/History";
import { useEffect } from "react";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

export function useCheckRegisterProcess() {
  const {
    account: { registercompleted },
  } = useAccountStore();

  const checkRegisterProcess = () => {
    if (
      registercompleted === false &&
      config.features.Register_ShowPhone &&
      config.features.ForcedVerification
    ) {
      AppHistory.push({
        pathname: "/profile/phone",
        state: { forced: true },
      });
    }
  };

  useEffect(() => {
    // register is not completed
    checkRegisterProcess();
  }, [registercompleted]);
}
