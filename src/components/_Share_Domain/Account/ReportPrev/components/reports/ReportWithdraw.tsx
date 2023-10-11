import React, { useEffect, useState } from "react";
import i18n from "@/utils/i18n";
import NoRecord from "@/components/_Share_Domain/Account/ReportPrev/components/NoRecord";
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
} from "@/components/_Share_Domain/Account/ReportPrev/styles";
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";
import { ReportService } from "@/services/ReportService";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";
import { useWithdrawalStatus } from "@/components/_Share_Domain/Account/ReportPrev/hooks/useWithdrawalStatus";
import StatusSelect from "@/components/_Share_Domain/Account/ReportPrev/components/StatusSelect";

export interface TabData {
  dateFrom: Date;
  dateTo: Date;
  type: number;
  dateRange: number;
  roundTotal: RoundTotalDto;
}
type Props = {
  tabData: TabData;
};

const PAGE_SIZE = 20;
const ReportWithdraw = ({ tabData }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { statusDictionary, status, handleStatusChange } =
    useWithdrawalStatus();

  const fetchReports = async () => {
    setIsLoading(true);

    ReportService.GetWithdrawalDetails(
      status,
      moment(tabData.dateFrom).utc().format(),
      moment(tabData.dateTo).utc().add(1, "days").format(),
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
    setIsMaxPage(false);
    fetchReports();
  }, [JSON.stringify(tabData), status]);

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
            <ReportSummaryCol>{i18n.t("report.dateTime")}</ReportSummaryCol>

            <ReportSummaryCol>{i18n.t("report.status")}</ReportSummaryCol>
            <ReportSummaryCol>{i18n.t("common.amount")}</ReportSummaryCol>
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
                        {i18n.t("report.NewOrderNumber")} :{" "}
                        <ReportCardCol>{row.orderno}</ReportCardCol>
                      </ReportCardRow>
                      <ReportCardRow>
                        <ReportCardCol>{date}</ReportCardCol>
                        <ReportCardCol>
                          {i18n.t(`report.withdrawal.status${row.status}`)}
                        </ReportCardCol>
                        <ReportCardCol>{row.amount}</ReportCardCol>
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
