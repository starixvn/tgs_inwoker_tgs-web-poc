import BottomAppBar from "@/components/BottomAppBar";
import Header from "@/components/Header";
import MenuDrawer from "@/components/Header/components/MenuDrawer";
import { DRAWER_WIDTH } from "@/contexts/headerContext";
import { useHeader } from "@/hooks/useHeader";
import { useRwd } from "@/hooks/useRwd";
import { media } from "@/theme/breakpoints";
import { styled as muiStyled } from "@mui/material/styles";
import { ReactElement } from "react";
import styled from "styled-components";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 80px;
  margin-bottom: 82px;
  min-height: calc(100vh - 80px - 82px);

  ${media.sm} {
    margin-top: 60px;
    min-height: calc(100vh - 60px);
    margin-bottom: unset;
  }
`;

const ContentWrapper = muiStyled("div", {
  shouldForwardProp: (prop) => prop !== "$isOpen",
})(({ theme, $isOpen }) => {
  return {
    position: "relative",
    flexGrow: 1,
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...($isOpen && {
      transition: theme.transitions.create("all", {
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
