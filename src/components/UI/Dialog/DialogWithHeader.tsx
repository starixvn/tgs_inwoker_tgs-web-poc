import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog } from "@mui/material";
import React, {
  CSSProperties,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import styled from "styled-components";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import { TransitionProps } from "@mui/material/transitions";

const DialogContainer = styled(MuiDialog)`
  z-index: 999 !important; // can't overlap footer(which z-index is 1000)
  & .MuiPaper-root {
    position: relative;
    padding: 73px 0 82px; // header/footer
    background: ${({ theme }) => theme.primaryDark};
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
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
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
  style?: CSSProperties;
  transitionComponent?: ForwardRefExoticComponent<
    PropsWithoutRef<TransitionProps & { children?: React.ReactElement }> &
      RefAttributes<unknown>
  >;
};
const DialogWithHeader = ({
  isOpen,
  handleCloseDialog,
  children,
  dialogHeaderTitle,
  style,
  transitionComponent,
}: Props) => {
  return (
    <DialogContainer
      fullScreen
      open={isOpen}
      TransitionComponent={transitionComponent || UpTransition}
      style={style}
    >
      <DialogHeader
        dialogHeaderTitle={dialogHeaderTitle || ""}
        handleClose={handleCloseDialog}
      />

      <ChildContainer>{children}</ChildContainer>
    </DialogContainer>
  );
};

export default React.memo(DialogWithHeader);
