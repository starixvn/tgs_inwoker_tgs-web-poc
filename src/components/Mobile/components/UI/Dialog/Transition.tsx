import React from "react";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export const UpTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export const LeftTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction="left" ref={ref} {...props} />;
});
