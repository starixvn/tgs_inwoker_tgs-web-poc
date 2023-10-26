import styled from "styled-components";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";

const NavCardContainer = styled.div`
  position: relative;
  border-radius: 10px;
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc((100% - 3 * 8px) / 4);
  padding: 20px 30px;

  color: ${({ theme }) => theme.tertiary};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;

  ${media.sm} {
    width: calc((100% - 7 * 8px) / 8);
  }
}
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
  navItem: NavItem;
  handleClick: (navItem: NavItem) => void;
};
const NavCard = ({ navItem, handleClick }: Props) => {
  const { label, iconUrl } = navItem;
  return (
    <NavCardContainer onClick={() => handleClick(navItem)}>
      <LogoContainer>
        <img src={iconUrl} alt={label} />
      </LogoContainer>

      <span>{label}</span>
    </NavCardContainer>
  );
};

export default NavCard;
