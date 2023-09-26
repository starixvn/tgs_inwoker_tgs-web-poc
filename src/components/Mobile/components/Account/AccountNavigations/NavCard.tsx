import { themeList } from "@/theme";
import styled from "styled-components";
import { NavCardItem } from "@/hooks/account/useAccountNavigations";

const theme = themeList["mobileT18"];

const NavCardContainer = styled.div`
  position: relative;
  border-radius: 10px;
  background: ${theme.primaryLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc((100% - 3 * 8px) / 4);
  padding: 20px 30px;

  color: ${theme.tertiary};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
  overflow: visible;
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
