import BottomAppBar from "@/components/BottomAppBar";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import { useRwd } from "@/hooks/useRwd";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ReactElement, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const PromotionLayoutContainer = styled.div`
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

const PromotionLayout = ({ children }: Props) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  const handleCloseDialog = useCallback(() => {
    history.push("/promotion-list")
  }, []);

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <PromotionLayoutContainer>
      <DialogHeader
        handleClose={handleCloseDialog}
        dialogHeaderTitle={"Promotion"}
      />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </PromotionLayoutContainer>
  );
};

export default PromotionLayout;
