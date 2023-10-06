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
const ReportWithdraw = ({ tabData, dataList }: Props) => {
  return (
    <ReportContainer>
      <ReportSummary>
        <ReportSummaryRow>
          <ReportSummaryCol>{i18n.t("report.dateTime")}</ReportSummaryCol>

          <ReportSummaryCol>{i18n.t("report.status")}</ReportSummaryCol>
          <ReportSummaryCol>{i18n.t("common.amount")}</ReportSummaryCol>
        </ReportSummaryRow>
      </ReportSummary>

      {(() => {
        if (dataList.length <= 0) {
          return <NoRecord />;
        } else {
          return (
            <ReportCardsContainer>
              {dataList.map((row, index) => {
                const date = moment(row.createdon).format("YYYY-MM-DD hh:mm a");
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      {i18n.t("report.NewOrderNumber")} :{" "}
                      <ReportCardCol>{row.orderno}</ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      <ReportCardCol>{date}</ReportCardCol>
                      <ReportCardCol>
                        {i18n.t(`report.withdrawal.status${row.status}`)}
                      </ReportCardCol>
                      <ReportCardCol>{row.amount}</ReportCardCol>
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

export default ReportWithdraw;
