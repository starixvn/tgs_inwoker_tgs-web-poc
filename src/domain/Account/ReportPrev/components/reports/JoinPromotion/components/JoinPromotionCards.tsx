import React from "react";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/domain/Account/ReportPrev/styles";
import moment from "moment";
import i18n from "@/utils/i18n";
import { JoinedPromotionsResponse } from "@/models/dto/general/GetJoinedPromoReportResDto";

type Props = {
  promotionDetails: JoinedPromotionsResponse[];
};
const JoinPromotionCards = ({ promotionDetails }: Props) => {
  if (!promotionDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {promotionDetails.map((promotionDetails, index) => {
        const date = moment(promotionDetails.joinedOn).format(
          "YYYY-MM-DD hh:mm a"
        );
        return (
          <ReportCard key={index}>
            <ReportCardRow>
              <ReportCardCol>{i18n.t("report.dateTime")} : </ReportCardCol>
              <ReportCardCol>{date}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>
                {i18n.t("report.joinedPromo.promoName")}:{" "}
              </ReportCardCol>
              <ReportCardCol>{promotionDetails.promotionName}</ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default JoinPromotionCards;
