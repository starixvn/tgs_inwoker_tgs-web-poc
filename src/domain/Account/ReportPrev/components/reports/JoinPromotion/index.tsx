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
} from "@/domain/Account/ReportPrev/styles";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { GeneralService } from "@/api-services/services/GeneralService";
import {
  GetJoinedPromoReportResDto,
  JoinedPromotionsResponse,
} from "@/models/dto/general/GetJoinedPromoReportResDto";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/domain/Account/ReportPrev/hooks/useDateRange";
import { useRwd } from "@/hooks/useRwd";
import JoinPromotionCards from "@/domain/Account/ReportPrev/components/reports/JoinPromotion/components/JoinPromotionCards";
import JoinPromotionTable from "@/domain/Account/ReportPrev/components/reports/JoinPromotion/components/JoinPromotionTable";

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

  const fetchReports = async () => {
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
        <JoinPromotionTable
          promotionDetails={promotionDetails}
          totalCount={totalCount}
        />
      ) : (
        <JoinPromotionCards promotionDetails={promotionDetails} />
      )}
      <Loading show={isLoading} />
    </ReportContainer>
  );
};

export default ReportJoinPromotion;
