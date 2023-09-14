import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "@/components/Mobile/components/Button";
import menuIcon from "@/assets/images/header/icon_menu.png";
import MenuButton from "@/components/Mobile/components/Header/MenuButton";

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
  const handleClick = useCallback(() => {}, []);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuButton />

        <h3>Logo</h3>

        <ButtonContainer>
          <Button
            label={"Login"}
            handleClick={handleClick}
            style={{ marginRight: "20px" }}
          />
          <Button
            label={"Register"}
            color={"#E7415A"}
            handleClick={handleClick}
          />
        </ButtonContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
