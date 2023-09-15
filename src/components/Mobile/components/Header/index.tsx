import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "@/components/Mobile/components/Button";
import MenuButton from "@/components/Mobile/components/Header/MenuButton";
import { useHistory } from "react-router";
import { useAuthDialog } from "@/components/Mobile/hooks/useAuthDialog";

const HeaderContainer = styled.div`
  background: #181f2b;
  height: 80px;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

type Props = {};
const Header = (props: Props) => {
  const history = useHistory();
  const { toggleLoginDialog, toggleRegisterDialog } = useAuthDialog();

  const handleClick = useCallback((path: string) => {
    history.push(path);
  }, []);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuButton />

        <h3>Logo</h3>

        <ButtonContainer>
          <Button
            onClick={() => toggleLoginDialog(true)}
            style={{ marginRight: "20px", background: "#5D50E0" }}
          >
            Login
          </Button>

          <Button
            color={"primary"}
            onClick={() => toggleRegisterDialog(true)}
            style={{ background: "#E7415A" }}
          >
            Register
          </Button>
        </ButtonContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
