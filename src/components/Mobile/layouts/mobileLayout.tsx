import React, { ReactElement } from "react";
import Header from "@/components/Mobile/components/Header";
import BottomAppBar from "@/components/Mobile/components/BottomAppBar";
import styled from "styled-components";
import { themeList } from "@/theme";
const theme = themeList["mobileT18"];

const MobileLayoutContainer = styled.div`
  position: relative;
  background: ${theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px - 82px); // 80px:Header, 82px: BottomAppBar
  margin: 80px 0 82px;
`;
type Props = {
  children: ReactElement;
};
const MobileLayout = ({ children }: Props) => {
  return (
    <MobileLayoutContainer>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </MobileLayoutContainer>
  );
};

export default MobileLayout;
