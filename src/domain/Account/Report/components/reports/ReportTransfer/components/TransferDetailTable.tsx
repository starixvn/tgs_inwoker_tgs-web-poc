import React from "react";
import NoRecord from "@/domain/Account/Report/components/NoRecord";
import {
  ReportCardsContainer,
  ReportTable,
} from "@/domain/Account/Report/styles";
import moment from "moment";
import i18n from "@/utils/i18n";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { GameBalanceInfosViewModel } from "@/models/dto/report/GetTransferReportResDto";
import config from "@/config/config";

type Props = {
  transferDetails: GameBalanceInfosViewModel[];
  totalCount: number;
};

const TransferDetailTable = ({ transferDetails, totalCount }: Props) => {
  if (!transferDetails?.length) {
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
              {i18n.t("report.dateTime")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.transfer.table.from")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.transfer.table.to")}
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.amount")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transferDetails.map((transferDetail, index) => {
            const { balancetime, amount, from, to } = transferDetail;

            const date = moment(balancetime).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={index}>
                <TableCell>{date}</TableCell>
                <TableCell>
                  {" "}
                  {from
                    ? from === "BTI" && config.currency === "PHP"
                      ? "PHSB"
                      : from
                    : ""}
                </TableCell>
                <TableCell>
                  {to
                    ? to === "BTI" && config.currency === "PHP"
                      ? "PHSB"
                      : to
                    : ""}
                </TableCell>
                <TableCell align={"right"}>{amount}</TableCell>
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

export default TransferDetailTable;
