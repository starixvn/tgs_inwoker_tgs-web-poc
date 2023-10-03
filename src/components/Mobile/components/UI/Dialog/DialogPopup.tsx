import { UpTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { themeList } from "@/theme";
import { Dialog as MuiDialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import styled from "styled-components";

const theme = themeList["mobileT18"];

const DialogContainer = styled(MuiDialog)`
  & .MuiPaper-root {
    background: ${theme.primaryLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 321px;
    height: 298px;
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
  height: auto;
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
