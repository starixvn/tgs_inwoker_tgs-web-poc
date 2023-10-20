import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { ReportContainer } from "@/domain/Account/Report/styles";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { ReportService } from "@/services/ReportService";
import Loading from "@/components/UI/Loading";
import { TransactionLogViewModel } from "@/models/dto/report/GetBalanceChangesResDto";
import { DateRangeInfo } from "@/domain/Account/Report/hooks/useDateRange";
import { useRwd } from "@/hooks/useRwd";
import BalanceChangeCards from "@/domain/Account/Report/components/reports/ReportBalanceChange/components/BalanceChangeCards";
import TransactionDetailTable from "@/domain/Account/Report/components/reports/ReportBalanceChange/components/BalanceChangeTable";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportBalanceChange = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [balanceChangeDetails, setBalanceChangeDetails] = useState<
    TransactionLogViewModel[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

  const fetchReports = async () => {
    setIsLoading(true);

    const getBalanceChangeRes = await ReportService.GetBalanceChanges(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE
    );

    if (getBalanceChangeRes.IsSuccess) {
      const newDataList =
        page > 1
          ? balanceChangeDetails.concat(getBalanceChangeRes.data.items)
          : getBalanceChangeRes.data.items;

      setBalanceChangeDetails(newDataList);
      setTotalCount(getBalanceChangeRes.data.totalcount || 0);
      setIsMaxPage(getBalanceChangeRes.data.totalcount == newDataList.length);
    } else {
      alert(
        "",
        getBalanceChangeRes?.info || JSON.stringify(getBalanceChangeRes)
      );
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
      {isDesktopSize ? (
        <TransactionDetailTable
          balanceChangeDetails={balanceChangeDetails}
          totalCount={totalCount}
        />
      ) : (
        <BalanceChangeCards balanceChangeDetails={balanceChangeDetails} />
      )}
      <Loading show={isLoading} />
    </ReportContainer>
  );
};

export default ReportBalanceChange;
