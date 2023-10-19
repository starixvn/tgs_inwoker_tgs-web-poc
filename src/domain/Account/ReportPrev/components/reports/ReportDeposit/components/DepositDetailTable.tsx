import React from "react";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import {
  ReportCardsContainer,
  ReportTable,
} from "@/domain/Account/ReportPrev/styles";
import moment from "moment";
import i18n from "@/utils/i18n";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DepositFormViewModel } from "@/models/dto/report/GetDepositDetailsResDto";

type Props = {
  transferDetails: DepositFormViewModel[];
  totalCount: number;
};
const TransactionDetailTable = ({ transferDetails, totalCount }: Props) => {
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
              {i18n.t("report.submitDate")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.NewOrderNumber")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.status")}
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
          {transferDetails.map((depositDetail) => {
            const { id, createdOn, amount, orderno, status } = depositDetail;

            const date = moment(createdOn).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={id}>
                <TableCell>{date}</TableCell>
                <TableCell>{orderno}</TableCell>
                <TableCell>
                  {i18n.t(`report.deposit.status${status}`)}
                </TableCell>
                <TableCell align={"right"}>{amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </ReportTable>

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
