import React from "react";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import {
  CustomWinLose,
  ReportCardsContainer,
  ReportTable,
} from "@/domain/Account/ReportPrev/styles";
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
import { JoinedPromotionsResponse } from "@/models/dto/general/GetJoinedPromoReportResDto";

type Props = {
  promotionDetails: JoinedPromotionsResponse[];
  totalCount: number;
};
const JoinPromotionTable = ({ promotionDetails, totalCount }: Props) => {
  if (promotionDetails.length <= 0) {
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
              {i18n.t("report.time")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("report.promoName")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promotionDetails.map((promotionDetail) => {
            const { id, joinedOn, promotionName } = promotionDetail;

            const date = moment(joinedOn).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={id}>
                <TableCell>{date}</TableCell>
                <TableCell>{promotionName}</TableCell>
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

export default JoinPromotionTable;
