import React, { useEffect, useState } from "react";
import i18n from "@/utils/i18n";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import moment from "moment/moment";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
  ReportContainer,
  ReportSummary,
  ReportSummaryCol,
  ReportSummaryRow,
} from "@/domain/Account/ReportPrev/styles";
import { ReportService } from "@/services/ReportService";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Loading from "@/components/UI/Loading";
import { useWithdrawalStatus } from "@/domain/Account/ReportPrev/hooks/useWithdrawalStatus";
import StatusSelect from "@/domain/Account/ReportPrev/components/StatusSelect";
import { DateRangeInfo } from "@/domain/Account/ReportPrev/hooks/useDateRange";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportWithdraw = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);

  const { statusDictionary, status, handleStatusChange } =
    useWithdrawalStatus();

  const fetchReports = async () => {
    setIsLoading(true);

    ReportService.GetWithdrawalDetails(
      status,
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      true,
      "CreatedOn",
      false,
      "1"
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
        <ReportSummary>
          <ReportSummaryRow>
            <ReportSummaryCol style={{ width: "33%" }}>
              {i18n.t("report.dateTime")}
            </ReportSummaryCol>

            <ReportSummaryCol style={{ width: "33%" }}>
              {i18n.t("report.status")}
            </ReportSummaryCol>
            <ReportSummaryCol style={{ width: "33%" }}>
              {i18n.t("common.amount")}
            </ReportSummaryCol>
          </ReportSummaryRow>
        </ReportSummary>

        {(() => {
          if (dataList.length <= 0) {
            return <NoRecord />;
          } else {
            return (
              <ReportCardsContainer>
                {dataList.map((row, index) => {
                  const date = moment(row.createdon).format(
                    "YYYY-MM-DD hh:mm a"
                  );
                  return (
                    <ReportCard key={index}>
                      <ReportCardRow>
                        <div>
                          {i18n.t("report.NewOrderNumber")} :{" "}
                          <ReportCardCol>{row.orderno}</ReportCardCol>
                        </div>
                      </ReportCardRow>

                      <ReportCardRow>
                        <ReportCardCol style={{ width: "33%" }}>
                          {date}
                        </ReportCardCol>
                        <ReportCardCol style={{ width: "33%" }}>
                          {i18n.t(`report.withdrawal.status${row.status}`)}
                        </ReportCardCol>
                        <ReportCardCol style={{ width: "33%" }}>
                          {row.amount}
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
    </>
  );
};

export default ReportWithdraw;
