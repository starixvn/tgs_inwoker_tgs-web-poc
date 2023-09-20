import React from "react";
import styled from "styled-components";
import Button from "@/components/Mobile/components/UI/Button";
import { useAuthDialog } from "@/hooks/useAuthDialog";

const ButtonContainer = styled.div`
  display: flex;
`;
type Props = {};
const AnonymousHeaderContent = (props: Props) => {
  const { toggleLoginDialog, toggleRegisterDialog } = useAuthDialog();

  return (
    <ButtonContainer>
      <Button
        onClick={toggleLoginDialog}
        style={{ marginRight: "20px", background: "#5D50E0" }}
      >
        Login
      </Button>

      <Button
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{ background: "#E7415A" }}
      >
        Register
      </Button>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
