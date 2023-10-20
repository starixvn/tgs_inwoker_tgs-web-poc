import { BrandAllAgent } from "@/models/dto/general/GetBrandAllAgentResDto";
import i18n from "@/utils/i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";

const StyledTable = styled(Table)`
  padding: 20px;
`;

const StyledTableHead = styled(TableHead)`
  background: ${({ theme }) => theme.primaryLight};
  & * {
    color: ${({ theme }) => theme.tertiaryLight};
  }
`;

const StyledTableBody = styled(TableBody)`
  background: ${({ theme }) => theme.tertiaryDark};
  & * {
    color: ${({ theme }) => theme.white};
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
