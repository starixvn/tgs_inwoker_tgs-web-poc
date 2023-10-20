import React from "react";
import menuIcon from "@/assets/images/header/icon_menu.png";
import styled from "styled-components";
import { useHeader } from "@/hooks/useHeader";
import Icon from "@/components/Icon";

type Props = {};
const MenuButton = ({}: Props) => {
  const { handleToggleMenu } = useHeader();

  return (
    <Icon
      iconUrl={menuIcon}
      width={"33px"}
      height={"33px"}
      onClick={() => handleToggleMenu()}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default MenuButton;
