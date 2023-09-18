import React from "react";
import styled from "styled-components";
import Button from "@/components/Mobile/components/UI/Button";
import { useAuthDialog } from "@/components/Mobile/hooks/useAuthDialog";
import ContextMenu from "@/components/Mobile/components/ContextMenu";

const ButtonContainer = styled.div`
  display: flex;
`;
type Props = {};
const AccountHeaderContent = (props: Props) => {
  const { toggleLoginDialog, toggleRegisterDialog } = useAuthDialog();

  return (
    <>
      <ButtonContainer>
        Logged in
        {/*<Button*/}
        {/*  onClick={toggleLoginDialog}*/}
        {/*  style={{ marginRight: "20px", background: "#5D50E0" }}*/}
        {/*>*/}
        {/*  Login*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*  color={"primary"}*/}
        {/*  onClick={toggleRegisterDialog}*/}
        {/*  style={{ background: "#E7415A" }}*/}
        {/*>*/}
        {/*  Register*/}
        {/*</Button>*/}
      </ButtonContainer>
      <ContextMenu/>
    </>
  );
};

export default AccountHeaderContent;
