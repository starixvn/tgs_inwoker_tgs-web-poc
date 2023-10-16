import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { RouteCategoryEnum } from "@/components/Mobile/router";

const BottomNavContainer = styled.div<{ $isSelected: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ $isSelected }) => ($isSelected ? "#B2C3EC" : "#596578")};
  background-image: ${({ $isSelected }) => {
    if ($isSelected) {
      return "radial-gradient(at top, rgba(178,195,236,0.3) 0%, rgba(178,195,236,0) 65%, rgba(255,255,255,0) 100%)";
    }
  }};
  padding: 10px 0;
`;

const IconContainer = styled.div``;

const NavLabel = styled.h6`
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1rem;
`;

export type BottomNavItem = {
  navType: "item" | "menu";
  label: string;
  iconUrl: string;
  iconActiveUrl: string;
  routePath: string;
  routeCategory: RouteCategoryEnum;
};
type Props = {
  bottomNavItem: BottomNavItem;
  isSelected: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const BottomNav = ({ bottomNavItem, onClick, isSelected }: Props) => {
  const { label, iconUrl, iconActiveUrl } = bottomNavItem;

  return (
    <BottomNavContainer onClick={onClick} $isSelected={isSelected}>
      <IconContainer>
        <img src={isSelected ? iconActiveUrl : iconUrl} alt={label} />
      </IconContainer>

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
