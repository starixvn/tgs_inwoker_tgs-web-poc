import { useGameStore } from "@/hooks/stores/useGameStore";
import { useMemo } from "react";
import i18n from "@/utils/i18n";

export interface ReportTab {
  index: number;
  label: string;
}

export function useReportTypeTabs() {
  const { game } = useGameStore();

  const displayedTabList = useMemo<ReportTab[]>(() => {
    return [
      {
        index: 2,
        label: i18n.t("report.bettingDetails"),
      },
      {
        index: 3,
        label: i18n.t("report.withdrawalDetails"),
      },
      {
        index: 4,
        label: i18n.t("report.depositDetails"),
      },
      (() => {
        if (game.containTransferWallet) {
          return {
            index: 6,
            label: i18n.t("common.transfer"),
          };
        }
      })(),
      {
        index: 8,
        label: i18n.t("report.balanceChanges.title"),
      },
      {
        index: 7,
        label: i18n.t("report.joinedPromo.title"),
      },
    ].filter((reportTab) => reportTab);
  }, [game.containTransferWallet]);

  return {
    displayedTabList,
  };
}
