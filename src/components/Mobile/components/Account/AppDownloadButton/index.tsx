import React from "react";
import styled from "styled-components";
import downloadImg from "@/assets/images/account/icon_download.png";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const AppDownloadButtonContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 20px;
  background: ${theme.primaryMiddle};
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

type Props = {};
const AppDownloadButton = (props: Props) => {
  return (
    <AppDownloadButtonContainer>
      <LogoContainer>
        <img src={downloadImg} alt={"download"} />
      </LogoContainer>

      <span>download</span>
    </AppDownloadButtonContainer>
  );
};

export default AppDownloadButton;
