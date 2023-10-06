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
const ReportTransfer = ({ tabData, dataList }: Props) => {
  return (
    <ReportContainer>
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
                      {i18n.t("report.transfer.table.from")} :{" "}
                      <ReportCardCol>
                        {row.from
                          ? row.from === "BTI" && config.currency === "PHP"
                            ? "PHSB"
                            : row.from
                          : ""}
                      </ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      {i18n.t("report.transfer.table.to")} :{" "}
                      <ReportCardCol>
                        {row.to
                          ? row.to === "BTI" && config.currency === "PHP"
                            ? "PHSB"
                            : row.to
                          : ""}
                      </ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      {i18n.t("report.amount")} :{" "}
                      <ReportCardCol>{row.amount}</ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      <ReportCardCol>
                        {moment(row.balancetime).format("YYYY-MM-DD hh:mm a")}
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

export default ReportTransfer;
