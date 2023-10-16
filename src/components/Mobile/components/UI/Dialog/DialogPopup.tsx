import { UpTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { Dialog as MuiDialog } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const DialogContainer = styled(MuiDialog)`
  & .MuiPaper-root {
    background: ${({ theme }) => theme.primaryLight};
    width: 321px;
    border-radius: 10px;
  }
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
`;

const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
  children: React.ReactElement;
};

const DialogPopup = ({ isOpen, handleCloseDialog, children }: Props) => {
  return (
    <>
      <DialogContainer open={isOpen} TransitionComponent={UpTransition}>
        <ChildContainer>{children}</ChildContainer>
        <CloseIconContainer>
          <CloseIcon
            onClick={handleCloseDialog}
            style={{
              color: "white",
              transform: "scale(1.6)",
            }}
          />
        </CloseIconContainer>
      </DialogContainer>
    </>
  );
};

export default React.memo(DialogPopup);
