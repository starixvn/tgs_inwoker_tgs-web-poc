import React, { useEffect, useState } from "react";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
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
} from "@/domain/Account/ReportPrev/styles";
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";
import { ReportService } from "@/services/ReportService";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/domain/Account/ReportPrev/hooks/useDateRange";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportBetting = ({ dateRangeInfo }: Props) => {
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

    const getTransactionDetailsRes = await ReportService.GetTransactionDetails(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      true,
      "",
      false
    );

    if (getTransactionDetailsRes.IsSuccess) {
      const newDataList =
        page > 1
          ? dataList.concat(getTransactionDetailsRes.data.items)
          : getTransactionDetailsRes.data.items;

      setDataList(newDataList);
      setIsMaxPage(
        getTransactionDetailsRes.data.totalCount == newDataList.length
      );
    } else {
      alert(
        "",
        getTransactionDetailsRes?.info ||
          JSON.stringify(getTransactionDetailsRes)
      );
      setIsLoading(false);
    }

    if (!config.features.Report_ShowRoundsTotal) return;

    const getRoundsTotalRes = await ReportService.GetRoundsTotal(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format()
    );

    if (getRoundsTotalRes.IsSuccess) {
      setRoundTotal(getRoundsTotalRes.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setIsMaxPage(false);
    fetchReports();
  }, [JSON.stringify(dateRangeInfo)]);

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
