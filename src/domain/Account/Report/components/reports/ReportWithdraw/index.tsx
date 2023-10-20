import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { ReportContainer } from "@/domain/Account/Report/styles";
import { ReportService } from "@/services/ReportService";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Loading from "@/components/UI/Loading";
import { useWithdrawalStatus } from "@/domain/Account/Report/hooks/useWithdrawalStatus";
import StatusSelect from "@/domain/Account/Report/components/StatusSelect";
import { DateRangeInfo } from "@/domain/Account/Report/hooks/useDateRange";
import { WithdrawFormViewModel } from "@/models/dto/report/GetWithdrawalDetailsResDto";
import { useRwd } from "@/hooks/useRwd";
import WithdrawalDetailTable from "@/domain/Account/Report/components/reports/ReportWithdraw/components/WithdrawalDetailTable";
import WithdrawalDetailCards from "@/domain/Account/Report/components/reports/ReportWithdraw/components/WithdrawalDetailCards";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportWithdraw = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [withdrawalDetails, setWithdrawalDetails] = useState<
    WithdrawFormViewModel[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

  const { statusDictionary, status, handleStatusChange } =
    useWithdrawalStatus();

  const fetchReports = async () => {
    setIsLoading(true);

    const getWithdrawalDetailsRes = await ReportService.GetWithdrawalDetails(
      status,
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      true,
      "CreatedOn",
      false,
      "1"
    );

    if (getWithdrawalDetailsRes.IsSuccess) {
      const newWithdrawalDetails =
        page > 1
          ? withdrawalDetails.concat(getWithdrawalDetailsRes.data.items)
          : getWithdrawalDetailsRes.data.items;
      setWithdrawalDetails(newWithdrawalDetails);
      setTotalCount(getWithdrawalDetailsRes.data.totalCount);
      setIsMaxPage(
        getWithdrawalDetailsRes.data.totalCount == newWithdrawalDetails.length
      );
    } else {
      alert(
        "",
        getWithdrawalDetailsRes?.info || JSON.stringify(getWithdrawalDetailsRes)
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setIsMaxPage(false);
    fetchReports();
  }, [JSON.stringify(dateRangeInfo), status]);

  const handleLoadMore = async () => {
    if (isMaxPage) return;

    setPage((prevState) => prevState++);
    await fetchReports();
  };

  return (
    <>
      <StatusSelect
        statusDictionary={statusDictionary}
        status={status}
        handleStatusChange={handleStatusChange}
      />

      <ReportContainer>
        {isDesktopSize ? (
          <WithdrawalDetailTable
            withdrawalDetails={withdrawalDetails}
            totalCount={totalCount}
          />
        ) : (
          <WithdrawalDetailCards withdrawalDetails={withdrawalDetails} />
        )}
        <Loading show={isLoading} />
      </ReportContainer>
    </>
  );
};

export default ReportWithdraw;
