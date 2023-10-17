import React, { ReactElement } from "react";
import Header from "@/components/Mobile/components/Header";
import BottomAppBar from "@/components/Mobile/components/BottomAppBar";
import styled from "styled-components";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px - 82px); // 80px:Header, 82px: BottomAppBar
  margin: 80px 0 82px;
  position: relative;
  z-index: 1;
`;
type Props = {
  children: ReactElement;
};
const DefaultLayout = ({ children }: Props) => {
  return (
    <DefaultLayoutContainer>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
