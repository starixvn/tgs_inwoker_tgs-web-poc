import React, { useEffect, useState } from "react";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import NoRecord from "@/domain/Account/Report/components/NoRecord";
import moment from "moment/moment";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
  ReportContainer,
} from "@/domain/Account/Report/styles";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { ReportService } from "@/services/ReportService";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/domain/Account/Report/hooks/useDateRange";
import { GameBalanceInfosViewModel } from "@/models/dto/report/GetTransferReportResDto";
import { useRwd } from "@/hooks/useRwd";
import TransferDetailTable from "@/domain/Account/Report/components/reports/ReportTransfer/components/TransferDetailTable";
import TransferDetailCard from "@/domain/Account/Report/components/reports/ReportTransfer/components/TransferDetailCard";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const Index = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { isDesktopSize } = useRwd();

  const [transferDetails, setTransferDetails] = useState<
    GameBalanceInfosViewModel[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);

  const fetchReports = async () => {
    setIsLoading(true);

    const getTransferReportRes = await ReportService.GetTransferReport(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      1,
      true,
      "BalanceTime",
      false
    );

    if (getTransferReportRes.IsSuccess) {
      const newTransferDetails =
        page > 1
          ? transferDetails.concat(getTransferReportRes.data.items)
          : getTransferReportRes.data.items;

      setTransferDetails(newTransferDetails);
      setTotalCount(getTransferReportRes.data.totalCount || 0);
      setIsMaxPage(
        getTransferReportRes.data.totalCount == newTransferDetails.length
      );
    } else {
      alert(
        "",
        getTransferReportRes?.info || JSON.stringify(getTransferReportRes)
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
        <TransferDetailTable
          transferDetails={transferDetails}
          totalCount={totalCount}
        />
      ) : (
        <TransferDetailCard transferDetails={transferDetails} />
      )}
      <Loading show={isLoading} />
    </ReportContainer>
  );
};

export default Index;
