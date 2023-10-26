import React, { ReactElement, useCallback } from "react";
import BottomAppBar from "@/components/BottomAppBar";
import styled from "styled-components";
import { usePageName } from "@/hooks/usePageName/usePageName";
import { useHistory } from "react-router-dom";
import { useRwd } from "@/hooks/useRwd";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useLocation } from "react-router";
import { Close as CloseIcon } from "@mui/icons-material";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryLight};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px - 82px); // 80px:Header, 82px: BottomAppBar
  margin: 80px 0 82px;
  position: relative;
  z-index: 1;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 22px;
  right: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  children: ReactElement;
};
const AuthDialogLayout = ({ children }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const { isDesktopSize } = useRwd();

  const pathname = location.pathname;
  const handleCloseDialog = useCallback(() => {
    const profileRegex = /\/profile\//;
    if (profileRegex.test(pathname)) {
      return history.push("/profile");
    }

    if (pathname === "/profile") {
      return history.push("/account");
    }

    history.push("/");
  }, [pathname]);

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <CloseIconContainer onClick={handleCloseDialog}>
        <CloseIcon
          style={{
            color: "white",
            transform: "scale(1.6)",
          }}
        />
      </CloseIconContainer>
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;
