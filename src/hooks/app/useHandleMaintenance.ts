import { useEffect } from "react";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { AppHistory } from "@/history/History";

export function useHandleMaintenance() {
  const {
    general: { isMaintenance },
  } = useGeneralStore();

  const handleMaintenance = () => {
    if (isMaintenance) {
      AppHistory.push("/maintenance");
    }
  };

  useEffect(() => {
    handleMaintenance();
  }, [isMaintenance]);
}
