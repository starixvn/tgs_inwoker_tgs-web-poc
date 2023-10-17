import { useMediaQuery, useTheme } from "@mui/material";

export function useRwd() {
  const theme = useTheme();
  const isSmSize = useMediaQuery(theme.breakpoints.only("sm"));
  const isMdSize = useMediaQuery(theme.breakpoints.only("md"));
  const isLgSize = useMediaQuery(theme.breakpoints.only("lg"));
  const isXlSize = useMediaQuery(theme.breakpoints.only("xl"));

  return {
    isSmSize,
    isMdSize,
    isLgSize,
    isXlSize,
  };
}
