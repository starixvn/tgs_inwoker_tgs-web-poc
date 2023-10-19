import React from "react";
import { InboxMessage } from "@/types/stores/account";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import i18n from "@/utils/i18n";
import moment from "moment/moment";
import { Dialog, TablePagination } from "@mui/material";

const InboxListContainer = styled.div`
  & > div {
    margin-bottom: 10px;
  }
`;

const LetterContent = styled.div``;

const StyledTable = muiStyled(Table)(({ theme }) => ({
  "& .MuiTableHead-root .MuiTableCell-root": {
    padding: "0",
    fontSize: "1.375rem",
    lineHeight: "1.611rem",
    fontWeight: 400,
  },

  "& .MuiTableBody-root .MuiTableCell-root": {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: "1.318rem",
    color: theme.palette.tertiary.light,
    borderBottom: `1px solid ${theme.palette.tertiary.light}`,
    padding: "26px 0 10px",
  },
}));

type Props = {
  inboxMessageList: InboxMessage[];
  selectedIds: string[];
  isEdit: boolean;
  handleCheckboxClick: (subjectID: string, guid: string) => void;
  handleItemClick: (id: string) => void;
  totalCount: number;
};
const MobileInboxList = ({
  inboxMessageList,
  selectedIds,
  isEdit,
  handleCheckboxClick,
  handleItemClick,
  totalCount,
}: Props) => {
  return (
    <InboxListContainer>
      <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              width="25%"
              sx={{
                border: "none",
              }}
            >
              {i18n.t("inbox.dateTime")}
            </TableCell>
            <TableCell
              width="25%"
              sx={{
                border: "none",
              }}
            >
              {i18n.t("inbox.title")}
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              {i18n.t("inbox.details")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inboxMessageList.map((inboxMessage) => {
            const { id, isread, createon, subject, content, localization } =
              inboxMessage;
            return (
              <TableRow key={id}>
                <TableCell width="25%">
                  {moment(createon).format("YYYY-MM-DD hh:mm a")}
                </TableCell>
                <TableCell width="25%">
                  {localization !== null && localization.subject
                    ? localization.subject
                    : subject}
                </TableCell>
                <TableCell>
                  <LetterContent
                    dangerouslySetInnerHTML={{
                      __html:
                        localization !== null && localization.content
                          ? localization.content
                          : content,
                    }}
                  />
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
    </InboxListContainer>
  );
};

export default MobileInboxList;
