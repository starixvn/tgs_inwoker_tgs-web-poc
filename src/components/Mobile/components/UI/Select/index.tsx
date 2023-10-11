import { withStyles } from "@material-ui/core/styles";
import { Select as MuiSelect } from "@material-ui/core";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

export const Select = withStyles(() => ({
  root: {
    color: `${theme.tertiary}`,
    fontSize: "0.937rem",
    fontWeight: 400,
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
  },
  select: {
    padding: "14px",
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
