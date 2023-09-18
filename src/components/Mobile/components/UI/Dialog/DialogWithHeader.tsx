import { UpTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { themeList } from "@/theme";
import { Dialog as MuiDialog } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import React, {
    CSSProperties,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes
} from "react";
import styled from "styled-components";

const theme = themeList["mobileT18"];

const DialogContainer = styled(MuiDialog)`
  z-index: 999 !important; // can't overlap footer(which z-index is 1000)
  & .MuiPaper-root {
    position: relative;
    padding: 73px 0 82px; // header/footer
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
  background: ${theme.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.white};
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
            <DialogHeaderContainer>
                {dialogHeaderTitle}

                <CloseIconContainer>
                    <CloseIcon
                        onClick={handleCloseDialog}
                        style={{
                            color: "white",
                            transform: "scale(1.6)",
                        }}
                    />
                </CloseIconContainer>
            </DialogHeaderContainer>

            <ChildContainer>{children}</ChildContainer>
        </DialogContainer>
    );
};

export default React.memo(DialogWithHeader);
