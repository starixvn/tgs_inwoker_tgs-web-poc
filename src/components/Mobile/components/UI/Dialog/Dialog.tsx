import React from "react";
import styled from "styled-components";
import { Dialog as MuiDialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { themeList } from "@/theme";
import { UpTransition } from "@/components/Mobile/components/UI/Dialog/Transition";

const theme = themeList["mobileT18"];

const DialogContainer = styled(MuiDialog)`
  & .MuiPaper-root {
    position: relative;
    padding: 73px 0 82px; // header/footer
    background: ${theme.primaryMiddle};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  return (
    <DialogContainer
      fullScreen
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
