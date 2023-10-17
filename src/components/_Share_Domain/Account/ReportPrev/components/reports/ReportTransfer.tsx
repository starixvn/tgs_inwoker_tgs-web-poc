import React, { useEffect, useState } from "react";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import NoRecord from "@/components/_Share_Domain/Account/ReportPrev/components/NoRecord";
import moment from "moment/moment";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
  ReportContainer,
} from "@/components/_Share_Domain/Account/ReportPrev/styles";
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { ReportService } from "@/services/ReportService";
import Loading from "@/components/UI/Loading";

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
const ReportTransfer = ({ tabData }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [isMaxPage, setIsMaxPage] = useState(false);

  const fetchReports = async () => {
    setIsLoading(true);

    ReportService.GetTransferReport(
      moment(tabData.dateFrom).utc().format(),
      moment(tabData.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      1,
      true,
      "BalanceTime",
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
      {(() => {
        if (dataList.length <= 0) {
          return <NoRecord />;
        } else {
          return (
            <ReportCardsContainer>
              {dataList.map((row, index) => {
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      {i18n.t("report.transfer.table.from")} :{" "}
                      <ReportCardCol>
                        {row.from
                          ? row.from === "BTI" && config.currency === "PHP"
                            ? "PHSB"
                            : row.from
                          : ""}
                      </ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      {i18n.t("report.transfer.table.to")} :{" "}
                      <ReportCardCol>
                        {row.to
                          ? row.to === "BTI" && config.currency === "PHP"
                            ? "PHSB"
                            : row.to
                          : ""}
                      </ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      {i18n.t("report.amount")} :{" "}
                      <ReportCardCol>{row.amount}</ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      <ReportCardCol>
                        {moment(row.balancetime).format("YYYY-MM-DD hh:mm a")}
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

export default ReportTransfer;
