import styled from "styled-components";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";

const AppDownloadButtonContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 20px;
  background: ${({ theme }) => theme.primaryLight};
  color: ${({ theme }) => theme.tertiary};
  border: none;
  cursor: pointer;

  ${media.sm} {
    margin-top: 12px;
  }
`;

const LogoContainer = styled.span`
  display: inline-block;
  margin-right: 10px;

  & > img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

type Props = {
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};

const AppDownloadButton = ({ navItem, handleClick }: Props) => {
  const { label, iconUrl } = navItem;
  return (
    <AppDownloadButtonContainer onClick={() => handleClick(navItem)}>
      <LogoContainer>
        <img src={iconUrl} alt={label} />
      </LogoContainer>

      <span>{label}</span>
    </AppDownloadButtonContainer>
  );
};

export default AppDownloadButton;
