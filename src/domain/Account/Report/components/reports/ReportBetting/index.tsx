import React, { useEffect, useState } from "react";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import moment from "moment/moment";
import {
  CustomWinLose,
  ReportContainer,
  ReportSummary,
  ReportSummaryCol,
  ReportSummaryRow,
} from "@/domain/Account/Report/styles";
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";
import { ReportService } from "@/services/ReportService";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/domain/Account/Report/hooks/useDateRange";
import { TransactionDetail } from "@/models/dto/report/GetTransactionDetailsResDto";
import TransactionDetailCards from "@/domain/Account/Report/components/reports/ReportBetting/components/TransactionDetailCards";
import { useRwd } from "@/hooks/useRwd";
import TransactionDetailTable from "@/domain/Account/Report/components/reports/ReportBetting/components/TransactionDetailTable";
import TotalState from "@/domain/Account/Report/components/reports/ReportBetting/components/TotalState";
import BottomScrollListener from "react-bottom-scroll-listener";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportBetting = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [transactionDetails, setTransactionDetails] = useState<
    TransactionDetail[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const [roundTotal, setRoundTotal] = useState<RoundTotalDto>({
    betAmount: null,
    validBetAmount: null,
    winLoss: null,
    settleAmount: null,
  });
  const { isDesktopSize } = useRwd();

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
          ? transactionDetails.concat(getTransactionDetailsRes.data.items)
          : getTransactionDetailsRes.data.items;

      setTransactionDetails(newDataList);
      setIsMaxPage(
        getTransactionDetailsRes.data.totalcount == newDataList.length
      );
      setTotalCount(getTransactionDetailsRes.data.totalcount || 0);
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
      <TotalState roundTotal={roundTotal} />

      {isDesktopSize ? (
        <TransactionDetailTable
          transactionDetails={transactionDetails}
          totalCount={totalCount}
        />
      ) : (
        <TransactionDetailCards transactionDetails={transactionDetails} />
      )}
      <Loading show={isLoading} />
      <BottomScrollListener onBottom={handleLoadMore} />
    </ReportContainer>
  );
};

export default ReportBetting;
