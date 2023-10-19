import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { ReportService } from "@/services/ReportService";
import Loading from "@/components/UI/Loading";
import { useDepositStatus } from "@/domain/Account/ReportPrev/hooks/useDepositStatus";
import StatusSelect from "@/domain/Account/ReportPrev/components/StatusSelect";
import { DateRangeInfo } from "@/domain/Account/ReportPrev/hooks/useDateRange";
import { DepositFormViewModel } from "@/models/dto/report/GetDepositDetailsResDto";
import DepositDetailCards from "@/domain/Account/ReportPrev/components/reports/ReportDeposit/components/DepositDetailCards";
import { useRwd } from "@/hooks/useRwd";
import DepositDetailTable from "@/domain/Account/ReportPrev/components/reports/ReportDeposit/components/DepositDetailTable";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportDeposit = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [depositDetails, setDepositDetails] = useState<DepositFormViewModel[]>(
    []
  );
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

  const { statusDictionary, status, handleStatusChange } = useDepositStatus();

  const fetchReports = async () => {
    setIsLoading(true);

    const getDepositDetailsRes = await ReportService.GetDepositDetails(
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

    if (getDepositDetailsRes.IsSuccess) {
      const newDepositDetails =
        page > 1
          ? depositDetails.concat(getDepositDetailsRes.data.items)
          : getDepositDetailsRes.data.items;

      setDepositDetails(newDepositDetails);
      setTotalCount(getDepositDetailsRes.data.totalCount || 0);
      setIsMaxPage(
        getDepositDetailsRes.data.totalCount == newDepositDetails.length
      );
    } else {
      alert(
        "",
        getDepositDetailsRes?.info || JSON.stringify(getDepositDetailsRes)
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

      {isDesktopSize ? (
        <DepositDetailTable
          depositDetails={depositDetails}
          totalCount={totalCount}
        />
      ) : (
        <DepositDetailCards depositDetails={depositDetails} />
      )}

      <Loading show={isLoading} />
    </>
  );
};

export default ReportDeposit;
