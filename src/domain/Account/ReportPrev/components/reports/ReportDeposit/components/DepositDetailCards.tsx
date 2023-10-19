import React from "react";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
  ReportContainer,
} from "@/domain/Account/ReportPrev/styles";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import moment from "moment";
import i18n from "@/utils/i18n";
import { Button } from "@/components/UI/Button";
import Loading from "@/components/UI/Loading";
import { DepositFormViewModel } from "@/models/dto/report/GetDepositDetailsResDto";
import { useHistory } from "react-router-dom";

type Props = {
  transferDetails: DepositFormViewModel[];
};
const DepositDetailCards = ({ transferDetails }: Props) => {
  const history = useHistory();

  const handleManualDeposit = (id: string) => {
    history.push({
      pathname: "/manual/" + id,
    });
  };

  if (transferDetails.length <= 0) {
    return (
      <ReportContainer>
        <NoRecord />;
      </ReportContainer>
    );
  }
  return (
    <ReportContainer>
      <ReportCardsContainer>
        {transferDetails.map((depositDetail, index) => {
          const { createdon, orderno, status, id, amount, canuploadcerts } =
            depositDetail;
          const date = moment(createdon).format("YYYY-MM-DD hh:mm a");
          return (
            <ReportCard key={index}>
              <ReportCardRow>
                {i18n.t("report.NewOrderNumber")} :{" "}
                <ReportCardCol>{orderno}</ReportCardCol>
              </ReportCardRow>
              <ReportCardRow>
                <ReportCardCol>
                  {i18n.t(`report.deposit.status${status}`)}
                </ReportCardCol>
                <ReportCardCol>{amount}</ReportCardCol>
                <ReportCardCol>
                  {status === 1 && canuploadcerts && (
                    <Button
                      onClick={() => {
                        handleManualDeposit(id);
                      }}
                    >
                      {i18n.t("deposit.uploadReceipt")}
                    </Button>
                  )}
                </ReportCardCol>
                <ReportCardRow>
                  <ReportCardCol>{date}</ReportCardCol>
                </ReportCardRow>
              </ReportCardRow>
            </ReportCard>
          );
        })}
      </ReportCardsContainer>
    </ReportContainer>
  );
};

export default DepositDetailCards;
