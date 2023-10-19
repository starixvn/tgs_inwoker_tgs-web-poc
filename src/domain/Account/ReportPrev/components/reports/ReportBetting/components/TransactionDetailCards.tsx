import React from "react";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import {
  CustomWinLose,
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/domain/Account/ReportPrev/styles";
import moment from "moment";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { TransactionDetail } from "@/models/dto/report/GetTransactionDetailsResDto";

type Props = {
  transactionDetails: TransactionDetail[];
};
const TransactionDetailCards = ({ transactionDetails }: Props) => {
  if (transactionDetails.length <= 0) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {transactionDetails.map((row, index) => {
        const date = moment(row.createdOn).format("YYYY-MM-DD hh:mm a");
        return (
          <ReportCard key={index}>
            <ReportCardRow>
              {i18n.t("report.betid")} : <ReportCardCol>{row.id}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>
                {config.features.WGHK_Setup
                  ? row.subGameProviderName
                  : row.gameProviderName
                  ? row.gameProviderName === "BTI" && config.currency === "PHP"
                    ? "PHSB"
                    : row.gameProviderName
                  : ""}
                - {row.gameName}
              </ReportCardCol>
              <ReportCardCol> {date}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>
                {i18n.t("report.betAmount")} :{row.betAmount}
              </ReportCardCol>{" "}
              <ReportCardCol>
                {i18n.t("report.validBet")} :{row.validBetAmount}
              </ReportCardCol>{" "}
              <ReportCardCol>
                {i18n.t("report.winloss")} :
                <CustomWinLose value={row.winLoss}>{row.winLoss}</CustomWinLose>
              </ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default TransactionDetailCards;
