import React, { useEffect, useState } from "react";
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
import { ReportService } from "@/services/ReportService";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";

export interface TabData {
  dateFrom: Date;
  dateTo: Date;
  type: number;
  dateRange: number;
}
type Props = {
  tabData: TabData;
};

const PAGE_SIZE = 20;
const ReportBetting = ({ tabData }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const [roundTotal, setRoundTotal] = useState<RoundTotalDto>({
    betAmount: null,
    validBetAmount: null,
    winLoss: null,
    settleAmount: null,
  });
  const fetchReports = async () => {
    setIsLoading(true);

    ReportService.GetTransactionDetails(
      moment(tabData.dateFrom).utc().format(),
      moment(tabData.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const newDataList =
          page > 1 ? dataList.concat(response.data.items) : response.data.items;

        setDataList(newDataList);
        setIsLoading(false);
        setIsMaxPage(response.data.totalCount == newDataList.length);
      } else {
        alert("", response?.info || JSON.stringify(response));
        setIsLoading(false);
      }
    });

    config.features.Report_ShowRoundsTotal &&
      ReportService.GetRoundsTotal(
        moment(tabData.dateFrom).utc().format(),
        moment(tabData.dateTo).utc().add(1, "days").format()
      ).then((result) => {
        if (result.IsSuccess) {
          setRoundTotal(result.data);
        }
      });
  };

  useEffect(() => {
    setIsMaxPage(false);
    fetchReports();
  }, [JSON.stringify(tabData)]);

  const handleLoadMore = async () => {
    if (isMaxPage) return;

    setPage((prevState) => prevState++);
    await fetchReports();
  };

  return (
    <ReportContainer>
      {config.features.Report_ShowRoundsTotal &&
        roundTotal &&
        (roundTotal.betAmount ||
          roundTotal.validBetAmount ||
          roundTotal.validBetAmount) && (
          <ReportSummary>
            <ReportSummaryRow>
              <ReportSummaryCol>
                {roundTotal &&
                  i18n.t("report.totalBetAmount") + ": " + roundTotal.betAmount}
              </ReportSummaryCol>
              <ReportSummaryCol>
                {roundTotal &&
                  i18n.t("report.totalValidBet") +
                    ": " +
                    roundTotal.validBetAmount}
              </ReportSummaryCol>
              <ReportSummaryCol>
                {i18n.t("report.totalWinLose") + ": "}
                <CustomWinLose value={roundTotal && roundTotal.winLoss}>
                  {roundTotal && roundTotal.winLoss}
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
      <Loading show={isLoading} />
    </ReportContainer>
  );
};

export default ReportBetting;
