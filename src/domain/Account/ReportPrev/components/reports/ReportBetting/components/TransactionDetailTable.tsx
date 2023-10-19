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
import { styled as muiStyled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import styled from "styled-components";

const StyledTable = muiStyled(Table)(({ theme }) => ({
  "& .MuiTableHead-root .MuiTableCell-root": {
    fontSize: "1.375rem",
    lineHeight: "1.611rem",
    fontWeight: 400,
    whiteSpace: "nowrap",
    padding: "0 5px",
  },

  "& .MuiTableBody-root .MuiTableCell-root": {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: "1.318rem",
    color: theme.palette.tertiary.light,
    borderBottom: `1px solid ${theme.palette.tertiary.light}`,
    padding: "26px 5px 10px",
  },
}));

type Props = {
  transactionDetails: TransactionDetail[];
  totalCount: number;
};
const TransactionDetailTable = ({ transactionDetails, totalCount }: Props) => {
  if (transactionDetails.length <= 0) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
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

            console.log(transactionDetail);

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
      </StyledTable>

      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={totalCount}
        rowsPerPage={25}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </ReportCardsContainer>
  );
};

export default TransactionDetailTable;
