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
import { WithdrawFormViewModel } from "@/models/dto/report/GetWithdrawalDetailsResDto";

type Props = {
  withdrawalDetails: WithdrawFormViewModel[];
};
const WithdrawalDetailCards = ({ dataList: withdrawalDetails }: Props) => {
  if (!withdrawalDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {withdrawalDetails.map((row, index) => {
        const date = moment(row.createdon).format("YYYY-MM-DD hh:mm a");
        return (
          <ReportCard key={index}>
            <ReportCardRow>
              <div>
                {i18n.t("report.NewOrderNumber")} :{" "}
                <ReportCardCol>{row.orderno}</ReportCardCol>
              </div>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol style={{ width: "33%" }}>{date}</ReportCardCol>
              <ReportCardCol style={{ width: "33%" }}>
                {i18n.t(`report.withdrawal.status${row.status}`)}
              </ReportCardCol>
              <ReportCardCol style={{ width: "33%" }}>
                {row.amount}
              </ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default WithdrawalDetailCards;
