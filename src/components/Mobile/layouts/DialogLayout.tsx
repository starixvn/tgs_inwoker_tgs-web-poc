import React, { ReactElement, useCallback } from "react";
import BottomAppBar from "@/components/Mobile/components/BottomAppBar";
import styled from "styled-components";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import { usePageName } from "@/hooks/usePageName";
import { useHistory } from "react-router-dom";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px - 82px); // 80px:Header, 82px: BottomAppBar
  margin: 80px 0 82px;
  position: relative;
  z-index: 1;
  padding: 21px 22px;
`;
type Props = {
  children: ReactElement;
};
const DialogLayout = ({ children }: Props) => {
  const history = useHistory();
  const { pageName } = usePageName();

  const handleCloseDialog = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <DialogLayoutContainer>
      <DialogHeader
        handleClose={handleCloseDialog}
        dialogHeaderTitle={pageName}
      />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
