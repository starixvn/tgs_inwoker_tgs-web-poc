import React, { useCallback } from "react";
import styled from "styled-components";
import { Button } from "@/components/Mobile/components/UI/Button";
import { useHistory } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
`;
type Props = {};
const AnonymousHeaderContent = (props: Props) => {
  const history = useHistory();

  const toggleLoginDialog = useCallback(() => {
    history.push("/login");
  }, []);
  const toggleRegisterDialog = useCallback(() => {
    history.push("/register");
  }, []);

  return (
    <ButtonContainer>
      <Button
        onClick={toggleLoginDialog}
        style={{
          marginRight: "20px",
          background: "#5D50E0",
          color: "white",
          fontSize: "1rem",
        }}
      >
        Login
      </Button>

      <Button
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{ background: "#E7415A", color: "white", fontSize: "1rem" }}
      >
        Register
      </Button>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
