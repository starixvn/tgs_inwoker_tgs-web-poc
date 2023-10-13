import {
  Switch as MuiSwitch,
  SwitchClassKey,
  SwitchProps,
  Theme,
} from "@mui/material";
import React from "react";
import { theme } from "@/theme";
import { createStyles, withStyles } from "@mui/styles";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

export const Switch = withStyles((muiTheme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: muiTheme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: muiTheme.palette.common.white,
        "& + $track": {
          backgroundColor: theme.primary,
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: theme.primary,
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${muiTheme.palette.grey[400]}`,
      backgroundColor: muiTheme.palette.grey[50],
      opacity: 1,
      transition: muiTheme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
