import React from "react";
import NoRecord from "@/domain/Account/Report/components/NoRecord";
import {
  CustomWinLose,
  ReportCardsContainer,
  ReportTable,
} from "@/domain/Account/Report/styles";
import moment from "moment";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { TransactionDetail } from "@/models/dto/report/GetTransactionDetailsResDto";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

type Props = {
  transactionDetails: TransactionDetail[];
  totalCount: number;
};
const TransactionDetailTable = ({ transactionDetails, totalCount }: Props) => {
  if (!transactionDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      <ReportTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.betDateTime")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.betid")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.platformgamename")}
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.totalBet")}
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.validBet")}
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.winloss")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionDetails.map((transactionDetail) => {
            const {
              id,
              createdOn,
              betAmount,
              validBetAmount,
              winLoss,
              subGameProviderName,
              gameProviderName,
              gameName,
            } = transactionDetail;

            const date = moment(createdOn).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={id}>
                <TableCell>{date}</TableCell>
                <TableCell>{id}</TableCell>
                <TableCell>
                  {config.features.WGHK_Setup
                    ? subGameProviderName
                    : gameProviderName
                    ? gameProviderName === "BTI" && config.currency === "PHP"
                      ? "PHSB"
                      : gameProviderName
                    : ""}
                  - {gameName}
                </TableCell>
                <TableCell align={"right"}>{betAmount}</TableCell>
                <TableCell align={"right"}>{validBetAmount}</TableCell>
                <TableCell align={"right"}>
                  <CustomWinLose $value={winLoss}>{winLoss}</CustomWinLose>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </ReportTable>

      {/*<TablePagination*/}
      {/*  rowsPerPageOptions={[25]}*/}
      {/*  component="div"*/}
      {/*  count={totalCount}*/}
      {/*  rowsPerPage={25}*/}
      {/*  page={0}*/}
      {/*  onPageChange={() => {}}*/}
      {/*  onRowsPerPageChange={() => {}}*/}
      {/*/>*/}
    </ReportCardsContainer>
  );
};

export default TransactionDetailTable;
