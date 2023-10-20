import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { ReportContainer } from "@/domain/Account/Report/styles";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { GeneralService } from "@/api-services/services/GeneralService";
import {
  GetJoinedPromoReportResDto,
  JoinedPromotionsResponse,
} from "@/models/dto/general/GetJoinedPromoReportResDto";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/domain/Account/Report/hooks/useDateRange";
import { useRwd } from "@/hooks/useRwd";
import JoinPromotionCards from "@/domain/Account/Report/components/reports/JoinPromotion/components/JoinPromotionCards";
import JoinPromotionTable from "@/domain/Account/Report/components/reports/JoinPromotion/components/JoinPromotionTable";
import BottomScrollListener from "react-bottom-scroll-listener";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportJoinPromotion = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [promotionDetails, setPromotionDetails] = useState<
    JoinedPromotionsResponse[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

  const fetchReports = async (page: number) => {
    setIsLoading(true);

    const getJoinedPromoReportRes = (await GeneralService.GetJoinedPromoReport(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      false,
      "",
      false
    )) as unknown as GetJoinedPromoReportResDto;

    if (getJoinedPromoReportRes.IsSuccess) {
      const newPromotionDetails =
        page > 1
          ? promotionDetails.concat(getJoinedPromoReportRes.data.items)
          : getJoinedPromoReportRes.data.items;

      setPromotionDetails(newPromotionDetails);
      setTotalCount(getJoinedPromoReportRes.data.totalcount || 0);
      setIsMaxPage(
        getJoinedPromoReportRes.data.totalcount == newPromotionDetails.length
      );
    } else {
      alert(
        "",
        getJoinedPromoReportRes?.info || JSON.stringify(getJoinedPromoReportRes)
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const currentPage = 1;

    setPage(currentPage);
    fetchReports(currentPage);
    setIsMaxPage(false);
  }, [JSON.stringify(dateRangeInfo)]);

  const handleLoadMore = async () => {
    if (isMaxPage) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchReports(nextPage);
  };

  return (
    <ReportContainer>
      {isDesktopSize ? (
        <JoinPromotionTable
          promotionDetails={promotionDetails}
          totalCount={totalCount}
        />
      ) : (
        <JoinPromotionCards promotionDetails={promotionDetails} />
      )}
      <Loading show={isLoading} />
      <BottomScrollListener onBottom={handleLoadMore} />
    </ReportContainer>
  );
};

export default ReportJoinPromotion;
