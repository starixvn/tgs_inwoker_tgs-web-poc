import React from "react";
import menuIcon from "@/assets/images/header/icon_menu.png";
import styled from "styled-components";
import { useHeader } from "@/hooks/useHeader";
import Icon from "@/components/Mobile/components/Icon";

const MenuIcon = styled.div`
  cursor: pointer;
`;

type Props = {};
const MenuButton = ({}: Props) => {
  const { handleToggleMenu } = useHeader();

  return (
    <Icon
      iconUrl={menuIcon}
      width={"33px"}
      height={"33px"}
      onClick={() => handleToggleMenu()}
    />
  );
};

export default MenuButton;
