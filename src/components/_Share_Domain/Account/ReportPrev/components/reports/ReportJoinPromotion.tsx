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
const ReportJoinPromotion = ({ tabData, dataList }: Props) => {
  return (
    <ReportContainer>
      {(() => {
        if (dataList.length <= 0) {
          return <NoRecord />;
        } else {
          return (
            <ReportCardsContainer>
              {dataList.map((row, index) => {
                const date = moment(row.joinedOn).format("YYYY-MM-DD hh:mm a");
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
                        {i18n.t("report.joinedPromo.promoName")}:{" "}
                      </ReportCardCol>
                      <ReportCardCol>{row.promotionName}</ReportCardCol>
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

export default ReportJoinPromotion;
