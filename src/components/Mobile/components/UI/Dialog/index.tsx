import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Dialog as MuiDialog, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";

const DialogContainer = styled(MuiDialog)`
  background: #181f2b;
  font-family: Roboto;

  & .MuiPaper-root {
    position: relative;
    padding: 15px;
    background: #181f2b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  isOpen: boolean;
  toggleDialog: () => void;
  children: React.ReactElement;
};
const Dialog = ({ isOpen, toggleDialog, children }: Props) => {
  return (
    <DialogContainer fullScreen open={isOpen} TransitionComponent={Transition}>
      <CloseIcon
        onClick={toggleDialog}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      />
      {children}
    </DialogContainer>
  );
};

export default React.memo(Dialog);
