import { withStyles } from "@material-ui/core/styles";
import { Select as MuiSelect } from "@material-ui/core";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

export const Select = withStyles(() => ({
  root: {
    color: `${theme.tertiary}`,
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
  },
  select: {
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
    "&:disabled": {
      color: `${theme.tertiary}`,
    },
  },
}))(MuiSelect);
