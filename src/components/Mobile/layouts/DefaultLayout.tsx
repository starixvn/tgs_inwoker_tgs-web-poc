import React, { ReactElement } from "react";
import Header from "@/components/Mobile/components/Header";
import BottomAppBar from "@/components/Mobile/components/BottomAppBar";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useRwd } from "@/hooks/useRwd";
import MenuDrawer from "@/components/Mobile/components/Header/components/MenuDrawer";
import { useHeader } from "@/hooks/useHeader";
import { DRAWER_WIDTH } from "@/contexts/headerContext";
import { media } from "@/theme/breakpoints";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 80px;

  ${media.sm} {
    margin-top: 60px;
  }
`;

const ContentWrapper = muiStyled("div", {
  shouldForwardProp: (prop) => prop !== "$isOpen",
})(({ theme, $isOpen }) => {
  return {
    position: "relative",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...($isOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    }),
  };
});

type Props = {
  children: ReactElement;
};
const DefaultLayout = ({ children }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <MenuDrawer
          isOpen={isMenuOpen}
          handleClose={() => handleToggleMenu(false)}
        />

        <ContentWrapper $isOpen={isDesktopSize && isMenuOpen}>
          {children}
        </ContentWrapper>
      </DashboardContainer>

      {isMobileSize && <BottomAppBar />}
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
