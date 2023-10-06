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
const ReportPlatform = ({ tabData, dataList }: Props) => {
  return (
    <ReportContainer>
      <ReportSummary>
        <ReportSummaryRow>
          <ReportSummaryCol>{i18n.t("report.submitDate")}</ReportSummaryCol>
          <ReportSummaryCol>{i18n.t("report.status")}</ReportSummaryCol>
          <ReportSummaryCol>
            {i18n.t("report.transferOut")}
            <br />
            {i18n.t("report.transferIn")}
          </ReportSummaryCol>

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
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      <ReportCardCol>
                        {moment(row.create_time_text).format(
                          "YYYY-MM-DD hh:mm a"
                        )}
                      </ReportCardCol>
                      <ReportCardCol>{row.status_text}</ReportCardCol>
                      <ReportCardCol>
                        {row.transform_out}
                        <br />
                        {row.transform_in}
                      </ReportCardCol>

                      <ReportCardCol>{row.amount_text}</ReportCardCol>
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

export default ReportPlatform;
