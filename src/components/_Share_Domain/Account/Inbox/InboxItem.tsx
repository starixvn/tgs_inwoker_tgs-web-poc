import React, { useState } from "react";
import styled from "styled-components";
import { Collapse } from "@mui/material";
import moment from "moment";
import { InboxMessage } from "@/types/account";

const InboxItemContainer = styled.div`
  width: 100%;
  padding: 8px 15px;
  background: ${({ theme }) => theme.primaryLight};
`;

type CheckboxContainerProps = {
  $edit: boolean;
};
const CheckboxContainer = styled.div<CheckboxContainerProps>`
  float: left;
  width: 46px;
  height: 46px;
  margin: 56px 0 0 20px;

  ${({ $edit }: CheckboxContainerProps) =>
    $edit ? `display:block` : `display:none`};
`;

const ContentContainer = styled.div`
  display: block;
  width: 90%;
`;

const ItemContainer = styled.div``;

type MsgTitleProps = {
  $isread: boolean;
};
const MsgTitle = styled.div<MsgTitleProps>`
  font-size: 1.25rem;
  font-weight: ${({ $isread }: MsgTitleProps) => ($isread ? "400" : "600")};
  color: ${({ theme }) => theme.white};
  white-space: nowrap;
  margin-bottom: 5px;
`;

const MsgTitleSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const MsgDate = styled.div`
  font-size: 0.937rem;
  color: ${({ theme }) => theme.tertiaryLight};
`;

type CheckboxCircleProps = {
  checked: boolean;
  onClick: () => void;
};
const CheckboxCircle = styled.div<CheckboxCircleProps>`
  width: 46px;
  height: 46px;

  ${(props: CheckboxCircleProps) =>
    props.checked
      ? `background: url(${
          process.env.PUBLIC_URL + `/assets/images/wapp/icon-inbox-checked.png`
        }) no-repeat;`
      : `border-radius: 23px;
    border: 2px solid #949494;`}
`;

const LetterContent = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.tertiaryLight};
  padding: 20px 0px;
`;

type Props = {
  row: InboxMessage;
  edit: boolean;
  handleCheckboxClick: (id: string, GUID: string) => void;
  selected: string[];
  handleItemClick: (id: string) => void;
};

const InboxItem = ({
  row,
  edit,
  handleCheckboxClick,
  selected,
  handleItemClick,
}: Props) => {
  const [opened, setOpened] = useState(false);

  const handleShowDetail = (isread: boolean) => {
    if (!opened && !isread) handleItemClick(row.id);
    setOpened(!opened);
  };

  return (
    <InboxItemContainer>
      <CheckboxContainer $edit={edit}>
        <CheckboxCircle
          onClick={() => handleCheckboxClick(row.id, row.id.toString())}
          checked={selected.includes(row.id)}
        ></CheckboxCircle>
      </CheckboxContainer>

      <ItemContainer>
        <ContentContainer onClick={() => handleShowDetail(row.isread)}>
          <MsgTitle $isread={row.isread}>
            <MsgTitleSpan>
              {row.localization !== null && row.localization.subject
                ? row.localization.subject
                : row.subject}
            </MsgTitleSpan>
          </MsgTitle>
          <MsgDate>{moment(row.createon).format("YYYY-MM-DD hh:mm a")}</MsgDate>
        </ContentContainer>
        <Collapse in={opened}>
          <LetterContent
            dangerouslySetInnerHTML={{
              __html:
                row.localization !== null && row.localization.content
                  ? row.localization.content
                  : row.content,
            }}
          ></LetterContent>
        </Collapse>
      </ItemContainer>
    </InboxItemContainer>
  );
};

export default InboxItem;
