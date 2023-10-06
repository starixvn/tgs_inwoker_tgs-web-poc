import React from "react";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import NoRecord from "@/components/_Share_Domain/Account/ReportPrev/components/NoRecord";
import moment from "moment/moment";
import {
  CustomWinLose,
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
import { Button } from "@/components/Mobile/components/UI/Button";
import { useHistory } from "react-router-dom";

export interface TabData {
  dateFrom: Date;
  dateTo: Date;
  type: number;
  dateRange: number;
  roundTotal: RoundTotalDto;
}
type Props = {
  tabData: TabData;
  dataList: any[];
};
const ReportDeposit = ({ tabData, dataList }: Props) => {
  const history = useHistory();

  const handleManualDeposit = (id: string) => {
    history.push({
      pathname: "/manual/" + id,
    });
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
                const date = moment(row.createdon).format("YYYY-MM-DD hh:mm a");
                return (
                  <ReportCard key={index}>
                    <ReportCardRow>
                      {i18n.t("report.NewOrderNumber")} :{" "}
                      <ReportCardCol>{row.orderno}</ReportCardCol>
                    </ReportCardRow>
                    <ReportCardRow>
                      <ReportCardCol>
                        {i18n.t(`report.deposit.status${row.status}`)}
                      </ReportCardCol>
                      <ReportCardCol>{row.amount}</ReportCardCol>
                      <ReportCardCol>
                        {row.status === 1 && row.canuploadcerts === true && (
                          <Button
                            onClick={() => {
                              handleManualDeposit(row.id);
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
          );
        }
      })()}
    </ReportContainer>
  );
};

export default ReportDeposit;
