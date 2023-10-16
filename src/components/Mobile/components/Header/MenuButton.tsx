import React, { useState } from "react";
import menuIcon from "@/assets/images/header/icon_menu.png";
import styled from "styled-components";
import MenuDrawer from "@/components/Mobile/components/Header/MenuDrawer";

const MenuIcon = styled.div`
  cursor: pointer;
`;

type Props = {};
const MenuButton = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <MenuIcon onClick={handleToggleMenu}>
        <img src={menuIcon} alt={"menu"} />
      </MenuIcon>

      <MenuDrawer
        isOpen={isMenuOpen}
        handleClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default MenuButton;
