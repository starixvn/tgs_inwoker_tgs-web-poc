import React from "react";
import { IconButton } from "@material-ui/core";
import { Close as MuiCloseIcon } from "@material-ui/icons";

type Props = {
  onClick: () => void;
};
const CloseIcon = ({ onClick }: Props) => {
  return (
    <IconButton edge="start" onClick={onClick} aria-label="close">
      <MuiCloseIcon />
    </IconButton>
  );
};

export default CloseIcon;
