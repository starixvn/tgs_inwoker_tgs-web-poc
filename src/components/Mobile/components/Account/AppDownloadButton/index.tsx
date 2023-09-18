import downloadImg from "@/assets/images/account/icon_download.png";
import { themeList } from "@/theme";
import styled from "styled-components";

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

const AppDownloadButton = () => {
    return (
        <AppDownloadButtonContainer>
            <LogoContainer>
                <img src={downloadImg} alt={"download"} />
            </LogoContainer>

            <span>App Download</span>
        </AppDownloadButtonContainer>
    );
};

export default AppDownloadButton;
