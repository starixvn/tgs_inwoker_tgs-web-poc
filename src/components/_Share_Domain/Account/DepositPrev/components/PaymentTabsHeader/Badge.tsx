import React from "react";
import { themeList } from "@/theme";
import styled from "styled-components";

const theme = themeList["mobileT18"];

type BadgeContainerProps = {
  $isActive: boolean;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  border-radius: 50px;
  padding: 12px 20px;
  //min-width: 86px;
  text-align: center;
  color: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? "white" : theme.tertiary};
  background: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? theme.primary : "none"};
  border: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? "none" : `1px solid ${theme.tertiary}`};

  border-radius: 50px;
`;

type Props = {
  text: string;
  isActive: boolean;
  handleClick: () => void;
};

const Badge = ({ text, handleClick, isActive }: Props) => {
  return (
    <BadgeContainer onClick={handleClick} $isActive={isActive}>
      {text}
    </BadgeContainer>
  );
};

export default Badge;
