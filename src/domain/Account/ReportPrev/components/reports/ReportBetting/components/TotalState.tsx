import React from "react";
import config from "@/config/config";
import {
  CustomWinLose,
  ReportSummary,
  ReportSummaryCol,
  ReportSummaryRow,
} from "@/domain/Account/ReportPrev/styles";
import i18n from "@/utils/i18n";
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";

type Props = {
  roundTotal: RoundTotalDto;
};
const TotalState = ({ roundTotal }: Props) => {
  const { betAmount, validBetAmount, winLoss, settleAmount } = roundTotal;
  return (
    <>
      {config.features.Report_ShowRoundsTotal &&
        roundTotal &&
        (betAmount || validBetAmount || validBetAmount) && (
          <ReportSummary>
            <ReportSummaryRow>
              <ReportSummaryCol>
                {roundTotal &&
                  i18n.t("report.totalBetAmount") + ": " + betAmount}
              </ReportSummaryCol>
              <ReportSummaryCol>
                {roundTotal &&
                  i18n.t("report.totalValidBet") + ": " + validBetAmount}
              </ReportSummaryCol>
              <ReportSummaryCol>
                {i18n.t("report.totalWinLose") + ": "}
                <CustomWinLose value={roundTotal && winLoss}>
                  {roundTotal && winLoss}
                </CustomWinLose>
              </ReportSummaryCol>
            </ReportSummaryRow>
          </ReportSummary>
        )}
    </>
  );
};

export default TotalState;
