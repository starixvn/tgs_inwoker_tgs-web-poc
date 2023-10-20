import { useMediaQuery, useTheme } from "@mui/material";

export function useRwd() {
  const theme = useTheme();
  const isXsSize = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmSize = useMediaQuery(theme.breakpoints.only("sm"));
  const isMdSize = useMediaQuery(theme.breakpoints.only("md"));
  const isLgSize = useMediaQuery(theme.breakpoints.only("lg"));
  const isXlSize = useMediaQuery(theme.breakpoints.only("xl"));

  const isMobileSize = isXsSize;
  const isDesktopSize = isSmSize || isMdSize || isLgSize || isXlSize;

  return {
    isXsSize,
    isSmSize,
    isMdSize,
    isLgSize,
    isXlSize,
    isMobileSize,
    isDesktopSize,
  };
}
