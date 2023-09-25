import React from "react";
import styled from "styled-components";
import ContextMenuButton from "./ContextMenuButton";

const ButtonContainer = styled.div`
  display: flex;
`;
type Props = {};
const AccountHeaderContent = (props: Props) => {
  return (
    <ButtonContainer>
      <ContextMenuButton />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
