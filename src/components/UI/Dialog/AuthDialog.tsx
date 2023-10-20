import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRwd } from "@/hooks/useRwd";
import AuthDialogImage from "@/domain/authentication/components/AuthDialogImage";

const DialogContainer = styled(MuiDialog)`
  & .MuiPaper-root {
    //max-height: 80vh;
    position: relative;
    background: ${({ theme }) => theme.primaryLight};
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const ChildContainer = styled.div`
  width: 50%;
  //max-height: 80vh;
  overflow: scroll;
`;

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
  children: React.ReactElement;
  dialogHeaderTitle?: string;
};
const AuthDialog = ({ isOpen, handleCloseDialog, children }: Props) => {
  const { isDesktopSize } = useRwd();

  if (!isDesktopSize) return null;

  return (
    <DialogContainer
      fullScreen={!isDesktopSize}
      open={isOpen}
      TransitionComponent={UpTransition}
      onClose={handleCloseDialog}
      maxWidth={"md"}
    >
      <AuthDialogImage />
      <ChildContainer>{children}</ChildContainer>
    </DialogContainer>
  );
};

export default React.memo(AuthDialog);
