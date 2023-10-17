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
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Loading from "@/components/UI/Loading";
import { usePlatformStatus } from "@/components/_Share_Domain/Account/ReportPrev/hooks/usePlatformStatus";
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
const ReportPlatform = ({ tabData }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [isMaxPage, setIsMaxPage] = useState(false);

  const { statusDictionary, status, handleStatusChange } = usePlatformStatus();

  // TODO: no ReportService.GetAccountDetails found
  const fetchReports = async () => {
    // this.setState({ ...this.state, loading: true });
    // ReportService.GetAccountDetails(
    //   moment(this.state.dateFrom).utc().format(),
    //   moment(this.state.dateTo).utc().add(1, "days").format(),
    //   page,
    //
    //   type
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
            <ReportSummaryCol>{i18n.t("report.submitDate")}</ReportSummaryCol>
            <ReportSummaryCol>{i18n.t("report.status")}</ReportSummaryCol>
            <ReportSummaryCol>
              {i18n.t("report.transferOut")}
              <br />
              {i18n.t("report.transferIn")}
            </ReportSummaryCol>

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
                  return (
                    <ReportCard key={index}>
                      <ReportCardRow>
                        <ReportCardCol>
                          {moment(row.create_time_text).format(
                            "YYYY-MM-DD hh:mm a"
                          )}
                        </ReportCardCol>
                        <ReportCardCol>{row.status_text}</ReportCardCol>
                        <ReportCardCol>
                          {row.transform_out}
                          <br />
                          {row.transform_in}
                        </ReportCardCol>

                        <ReportCardCol>{row.amount_text}</ReportCardCol>
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

export default ReportPlatform;
