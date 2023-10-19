import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRwd } from "@/hooks/useRwd";

const DialogContainer = styled(MuiDialog)`
  & .MuiPaper-root {
    position: relative;
    padding: 73px 0 82px; // header/footer
    background: ${({ theme }) => theme.primaryLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
  padding: 21px 22px;
`;

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
  children: React.ReactElement;
  dialogHeaderTitle?: string;
};
const Dialog = ({ isOpen, handleCloseDialog, children }: Props) => {
  const { isDesktopSize } = useRwd();

  return (
    <DialogContainer
      fullScreen={!isDesktopSize}
      open={isOpen}
      TransitionComponent={UpTransition}
    >
      <CloseIconContainer>
        <CloseIcon
          onClick={handleCloseDialog}
          style={{
            color: "white",
            transform: "scale(1.6)",
          }}
        />
      </CloseIconContainer>

      <ChildContainer>{children}</ChildContainer>
    </DialogContainer>
  );
};

export default React.memo(Dialog);
