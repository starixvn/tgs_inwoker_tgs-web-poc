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
import ErrorSwitcher from "@/utils/ErrorSwitcher";

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
const ReportBalanceChange = ({ tabData, dataList }: Props) => {
  return (
    <ReportContainer>
      {(() => {
        if (dataList.length <= 0) {
          return <NoRecord />;
        } else {
          return (
            <ReportCardsContainer>
              {dataList.map((row, index) => {
                const date = moment(row.recordedon).format(
                  "YYYY/MM/DD hh:mm:ss"
                );
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      <ReportCardCol>
                        {i18n.t("report.dateTime")} :{" "}
                      </ReportCardCol>
                      <ReportCardCol>{date}</ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      <ReportCardCol>
                        {i18n.t("report.balanceChanges.type")}:{" "}
                      </ReportCardCol>
                      <ReportCardCol>
                        {ErrorSwitcher.getTranslation(row.type)}
                      </ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      <ReportCardCol>
                        {i18n.t("report.balanceChanges.amount")}:{" "}
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

export default ReportBalanceChange;
