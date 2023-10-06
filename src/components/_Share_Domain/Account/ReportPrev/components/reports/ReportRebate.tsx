import React from "react";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import NoRecord from "@/components/_Share_Domain/Account/ReportPrev/components/NoRecord";
import moment from "moment/moment";
import {
  CustomWinLose,
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
  ReportContainer,
  ReportSummary,
  ReportSummaryCol,
  ReportSummaryRow,
} from "@/components/_Share_Domain/Account/ReportPrev/styles";
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";

export interface TabData {
  dateFrom: Date;
  dateTo: Date;
  type: number;
  dateRange: number;
  roundTotal: RoundTotalDto;
}
type Props = {
  tabData: TabData;
  dataList: any[];
};
const ReportRebate = ({ tabData, dataList }: Props) => {
  return (
    <ReportContainer>
      <ReportSummary>
        <ReportSummaryRow>
          <ReportSummaryCol>{i18n.t("report.rebate.sn")}</ReportSummaryCol>
          <ReportSummaryCol>
            {i18n.t("report.rebate.cycleDate")}
          </ReportSummaryCol>
          <ReportSummaryCol>{i18n.t("report.status")}</ReportSummaryCol>
          <ReportSummaryCol>
            {i18n.t("report.rebate.validBet")}
            <br />
            {i18n.t("report.rebate.amount")}
          </ReportSummaryCol>
        </ReportSummaryRow>
      </ReportSummary>
      {(() => {
        if (dataList.length <= 0) {
          return <NoRecord />;
        } else {
          return (
            <ReportCardsContainer>
              {dataList.map((row, index) => {
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      <ReportCardCol>{row.sn}</ReportCardCol>
                      <ReportCardCol>{row.date}</ReportCardCol>
                      <ReportCardCol>{row.status_text}</ReportCardCol>
                      <ReportCardCol>
                        {row.bet_valid_text}
                        <br />
                        {row.rebate_amount_text}
                      </ReportCardCol>
                    </ReportCardRow>
                  </ReportCard>
                );
              })}
            </ReportCardsContainer>
          );
        }
      })()}
    </ReportContainer>
  );
};

export default ReportRebate;
