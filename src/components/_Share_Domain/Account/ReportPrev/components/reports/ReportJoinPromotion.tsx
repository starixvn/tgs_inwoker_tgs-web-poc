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
} from "@/components/_Share_Domain/Account/ReportPrev/styles";
import { RoundTotalDto } from "@/models/dto/report/GetRoundsTotalResDto";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { GeneralService } from "@/api-services/services/GeneralService";
import { GetJoinedPromoReportResDto } from "@/models/dto/general/GetJoinedPromoReportResDto";
import Loading from "@/components/Mobile/components/UI/Loading";

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
const ReportJoinPromotion = ({ tabData }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [isMaxPage, setIsMaxPage] = useState(false);

  const fetchReports = async () => {
    setIsLoading(true);

    (
      GeneralService.GetJoinedPromoReport(
        moment(tabData.dateFrom).utc().format(),
        moment(tabData.dateTo).utc().add(1, "days").format(),
        page,
        PAGE_SIZE,
        false,
        "",
        false
      ) as unknown as Promise<GetJoinedPromoReportResDto>
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
                const date = moment(row.joinedOn).format("YYYY-MM-DD hh:mm a");
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      <ReportCardCol>
                        {i18n.t("report.dateTime")} :{" "}
                      </ReportCardCol>
                      <ReportCardCol>{date}</ReportCardCol>
                    </ReportCardRow>

                    <ReportCardRow>
                      <ReportCardCol>
                        {i18n.t("report.joinedPromo.promoName")}:{" "}
                      </ReportCardCol>
                      <ReportCardCol>{row.promotionName}</ReportCardCol>
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

export default ReportJoinPromotion;
