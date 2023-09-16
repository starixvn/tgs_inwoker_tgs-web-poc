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
`;

const LogoContainer = styled.div`
  margin-bottom: 10px;

  & > img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

type Props = {
  label: string;
  iconUrl: string;
};
const NavCard = ({ label, iconUrl }: Props) => {
  return (
    <NavCardContainer>
      <LogoContainer>
        <img src={iconUrl} alt={label} />
      </LogoContainer>

      <span>label</span>
    </NavCardContainer>
  );
};

export default NavCard;
