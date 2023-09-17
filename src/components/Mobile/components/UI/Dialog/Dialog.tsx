import React from "react";
import styled from "styled-components";
import { Dialog as MuiDialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { themeList } from "@/theme";
import { Transition } from "@/components/Mobile/components/UI/Dialog/Transition";

const theme = themeList["mobileT18"];

const DialogContainer = styled(MuiDialog)`
  & * {
    color: ${theme.white};
  }

  & .MuiPaper-root {
    position: relative;
    padding: 15px;
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

type Props = {
  isOpen: boolean;
  toggleDialog: () => void;
  children: React.ReactElement;
  dialogHeaderTitle?: string;
};
const Dialog = ({ isOpen, toggleDialog, children }: Props) => {
  return (
    <DialogContainer fullScreen open={isOpen} TransitionComponent={Transition}>
      <CloseIconContainer>
        <CloseIcon
          onClick={toggleDialog}
          style={{
            color: "white",
            transform: "scale(1.6)",
          }}
        />
      </CloseIconContainer>

      {children}
    </DialogContainer>
  );
};

export default React.memo(Dialog);
