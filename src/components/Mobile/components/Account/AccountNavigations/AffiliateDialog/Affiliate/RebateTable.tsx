import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import i18n from "@/utils/i18n";
import { BrandAllAgent } from "@/models/dto/general/GetBrandAllAgentResDto";
import styled from "styled-components";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const StyledTable = styled(Table)`
  padding: 20px;
`;

const StyledTableHead = styled(TableHead)`
  background: ${theme.primaryMiddle};
  & * {
    color: ${theme.tertiaryLight};
  }
`;

const StyledTableBody = styled(TableBody)`
  background: ${theme.tertiaryDark};
  & * {
    color: ${theme.white};
  }
`;

const StyledTableCell = styled(TableCell)`
  padding: 10px 20px;
`;

type Props = {
  rebateTableRow: BrandAllAgent[];
};
const RebateTable = ({ rebateTableRow }: Props) => {
  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <StyledTableCell>{i18n.t("rebateRate.players")}</StyledTableCell>
          <StyledTableCell>{i18n.t("rebateRate.turnover")}</StyledTableCell>
          <StyledTableCell>{i18n.t("rebateRate.rebates")}(%)</StyledTableCell>
        </TableRow>
      </StyledTableHead>

      <StyledTableBody>
        {rebateTableRow.map((brandAllAgent, index) => {
          const { activenumber, turnover, rebatepercentage } = brandAllAgent;
          return (
            <TableRow key={index}>
              <StyledTableCell>{activenumber}</StyledTableCell>
              <StyledTableCell>{turnover}</StyledTableCell>
              <StyledTableCell>{rebatepercentage}</StyledTableCell>
            </TableRow>
          );
        }) || <TableRow />}
      </StyledTableBody>
    </StyledTable>
  );
};

export default RebateTable;
