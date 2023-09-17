import React from "react";
import styled from "styled-components";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const NavCardContainer = styled.div`
  border-radius: 10px;
  background: ${theme.primaryMiddle};
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: calc((100% - 3 * 8px) / 4);
  padding: 20px 30px;

  color: ${theme.tertiary};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
`;

const LogoContainer = styled.div`
  margin-bottom: 10px;

  & > img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

export interface NavCardItem {
  key: string;
  label: string;
  iconUrl: string;
}

type Props = {
  navCardItem: NavCardItem;
  handleClick: (navCardItem: NavCardItem) => void;
};
const NavCard = ({ navCardItem, handleClick }: Props) => {
  const { label, iconUrl } = navCardItem;
  return (
    <NavCardContainer onClick={() => handleClick(navCardItem)}>
      <LogoContainer>
        <img src={iconUrl} alt={label} />
      </LogoContainer>

      <span>{label}</span>
    </NavCardContainer>
  );
};

export default NavCard;
