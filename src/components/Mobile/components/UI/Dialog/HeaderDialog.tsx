import React, { CSSProperties, useCallback, useState } from "react";
import styled from "styled-components";
import { Dialog as MuiDialog, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
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
    padding: 73px;
    background: ${theme.primaryDark};
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const DialogHeaderContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 73px;
  top: 0;
  left: 0;
  background: ${theme.primaryMiddle};
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

type Props = {
  isOpen: boolean;
  toggleDialog: () => void;
  children: React.ReactElement;
  dialogHeaderTitle?: string;
  style?: CSSProperties;
};
const Dialog = ({
  isOpen,
  toggleDialog,
  children,
  dialogHeaderTitle,
  style,
}: Props) => {
  return (
    <DialogContainer
      fullScreen
      open={isOpen}
      TransitionComponent={Transition}
      style={style}
    >
      <DialogHeaderContainer>
        {dialogHeaderTitle}

        <CloseIconContainer>
          <CloseIcon
            onClick={toggleDialog}
            style={{
              color: "white",
              transform: "scale(1.6)",
            }}
          />
        </CloseIconContainer>
      </DialogHeaderContainer>

      {children}
    </DialogContainer>
  );
};

export default React.memo(Dialog);
