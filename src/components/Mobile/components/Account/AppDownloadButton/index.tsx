import downloadImg from "@/assets/images/account/icon_download.png";
import { themeList } from "@/theme";
import styled from "styled-components";
import { NavCardItem } from "@/components/Mobile/hooks/account/useAccountNavigations";

const theme = themeList["mobileT18"];

const AppDownloadButtonContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 20px;
  background: ${theme.primaryLight};
  color: ${theme.tertiary};
  border: none;
  cursor: pointer;
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
  navCardItem: NavCardItem;
  handleClick: (navCardItem: NavCardItem) => void;
};

const AppDownloadButton = ({ navCardItem, handleClick }: Props) => {
  const { label, iconUrl } = navCardItem;
  return (
    <AppDownloadButtonContainer onClick={() => handleClick(navCardItem)}>
      <LogoContainer>
        <img src={iconUrl} alt={label} />
      </LogoContainer>

      <span>{label}</span>
    </AppDownloadButtonContainer>
  );
};

export default AppDownloadButton;
