import React from "react";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/domain/Account/ReportPrev/styles";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import moment from "moment";
import { GameBalanceInfosViewModel } from "@/models/dto/report/GetTransferReportResDto";

type Props = {
  transferDetails: GameBalanceInfosViewModel[];
};
const TransferDetailCard = ({ transferDetails }: Props) => {
  if (!transferDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {transferDetails.map((transferDetail, index) => {
        const { balancetime, amount, from, to } = transferDetail;

        return (
          <ReportCard key={index}>
            <ReportCardRow>
              {i18n.t("report.transfer.table.from")} :{" "}
              <ReportCardCol>
                {from
                  ? from === "BTI" && config.currency === "PHP"
                    ? "PHSB"
                    : from
                  : ""}
              </ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              {i18n.t("report.transfer.table.to")} :{" "}
              <ReportCardCol>
                {to
                  ? to === "BTI" && config.currency === "PHP"
                    ? "PHSB"
                    : to
                  : ""}
              </ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              {i18n.t("report.amount")} :{" "}
              <ReportCardCol>{amount}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>
                {moment(balancetime).format("YYYY-MM-DD hh:mm a")}
              </ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default TransferDetailCard;
