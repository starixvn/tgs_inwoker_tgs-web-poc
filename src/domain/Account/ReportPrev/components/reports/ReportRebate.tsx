import React, { useEffect, useState } from "react";
import i18n from "@/utils/i18n";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
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
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
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
const ReportRebate = ({ tabData }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [isMaxPage, setIsMaxPage] = useState(false);

  // TODO: no ReportService.GetRebateDetails found
  const fetchReports = async () => {
    // this.setState({ ...this.state, loading: true });
    // ReportService.GetRebateDetails(
    //   moment(this.state.dateFrom).utc().format(),
    //   moment(this.state.dateTo).utc().add(1, "days").format(),
    //   page
    // ).then((response) => {
    //   if (response.IsSuccess) {
    //     const dataList =
    //       page > 1
    //         ? this.state.dataList.concat(response.data.list)
    //         : response.data.list;
    //     this.setState({
    //       ...this.state,
    //       dataList: dataList,
    //       loading: false,
    //
    //       isMaxPage: response.data.count == dataList.length,
    //     });
    //   } else {
    //     this.props.alert("", response.info);
    //     this.setState({
    //       ...this.state,
    //
    //       loading: false,
    //     });
    //   }
    // });
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
      <ReportSummary>
        <ReportSummaryRow>
          <ReportSummaryCol>{i18n.t("report.rebate.sn")}</ReportSummaryCol>
          <ReportSummaryCol>
            {i18n.t("report.rebate.cycleDate")}
          </ReportSummaryCol>
          <ReportSummaryCol>{i18n.t("report.status")}</ReportSummaryCol>
          <ReportSummaryCol>
            {i18n.t("report.rebate.validBet")}
            <br />
            {i18n.t("report.rebate.amount")}
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
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      <ReportCardCol>{row.sn}</ReportCardCol>
                      <ReportCardCol>{row.date}</ReportCardCol>
                      <ReportCardCol>{row.status_text}</ReportCardCol>
                      <ReportCardCol>
                        {row.bet_valid_text}
                        <br />
                        {row.rebate_amount_text}
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

export default ReportRebate;
