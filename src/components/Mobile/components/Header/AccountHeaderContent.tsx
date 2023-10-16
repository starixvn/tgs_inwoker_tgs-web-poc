import React from "react";
import styled from "styled-components";
import ContextMenuButton from "./ContextMenuButton";
import BalanceTracker from "@/components/Mobile/components/BalanceTracker";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
type Props = {};
const AccountHeaderContent = (props: Props) => {
  return (
    <ButtonContainer>
      <BalanceTracker size={"small"} style={{ marginRight: "10px" }} />
      <ContextMenuButton />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
