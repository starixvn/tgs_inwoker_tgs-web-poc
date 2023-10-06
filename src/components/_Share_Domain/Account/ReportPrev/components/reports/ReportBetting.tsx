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
const ReportBetting = ({ tabData, dataList }: Props) => {
  return (
    <ReportContainer>
      {config.features.Report_ShowRoundsTotal &&
        tabData.roundTotal &&
        (tabData.roundTotal.betAmount ||
          tabData.roundTotal.validBetAmount ||
          tabData.roundTotal.validBetAmount) && (
          <ReportSummary>
            <ReportSummaryRow>
              <ReportSummaryCol>
                {tabData.roundTotal &&
                  i18n.t("report.totalBetAmount") +
                    ": " +
                    tabData.roundTotal.betAmount}
              </ReportSummaryCol>
              <ReportSummaryCol>
                {tabData.roundTotal &&
                  i18n.t("report.totalValidBet") +
                    ": " +
                    tabData.roundTotal.validBetAmount}
              </ReportSummaryCol>
              <ReportSummaryCol>
                {i18n.t("report.totalWinLose") + ": "}
                <CustomWinLose
                  value={tabData.roundTotal && tabData.roundTotal.winLoss}
                >
                  {tabData.roundTotal && tabData.roundTotal.winLoss}
                </CustomWinLose>
              </ReportSummaryCol>
            </ReportSummaryRow>
          </ReportSummary>
        )}

      {(() => {
        if (dataList.length <= 0) {
          return <NoRecord />;
        } else {
          return (
            <ReportCardsContainer>
              {dataList.map((row, index) => {
                const date = moment(row.createdOn).format("YYYY-MM-DD hh:mm a");
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      {i18n.t("report.betid")} :{" "}
                      <ReportCardCol>{row.id}</ReportCardCol>
                    </ReportCardRow>

                    <ReportCardRow>
                      <ReportCardCol>
                        {config.features.WGHK_Setup
                          ? row.subGameProviderName
                          : row.gameProviderName
                          ? row.gameProviderName === "BTI" &&
                            config.currency === "PHP"
                            ? "PHSB"
                            : row.gameProviderName
                          : ""}
                        - {row.gameName}
                      </ReportCardCol>
                      <ReportCardCol> {date}</ReportCardCol>
                    </ReportCardRow>

                    <ReportCardRow>
                      <ReportCardCol>
                        {i18n.t("report.betAmount")} :{row.betAmount}
                      </ReportCardCol>{" "}
                      <ReportCardCol>
                        {i18n.t("report.validBet")} :{row.validBetAmount}
                      </ReportCardCol>{" "}
                      <ReportCardCol>
                        {i18n.t("report.winloss")} :
                        <CustomWinLose value={row.winLoss}>
                          {row.winLoss}
                        </CustomWinLose>
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

export default ReportBetting;
