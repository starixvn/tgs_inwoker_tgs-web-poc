import React from "react";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileDatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import i18n from "@/utils/i18n";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import { ThemeOptions } from "@mui/system";

const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

//@ts-ignore
const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.primary,
      mainGradient: theme.primaryGradient,
    },
  },
  overrides: {},
  components: {
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          color: theme.primary,
          display: "block",
        },
      },
    },
  },
});

const DatePicker = (props: MobileDatePickerProps<any>) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language.substring(0, 2)]}
    >
      <ThemeProvider theme={muiTheme}>
        <MobileDatePicker
          {...props}
          autoOk
          clearable
          disableFuture
          format="yyyy/MM/dd"
          orientation={"portrait"}
          sx={{
            "& fieldset": { border: "none" },
          }}
          slotProps={{
            layout: {
              sx: {
                [`.MuiPickersLayout-root`]: {
                  gridColumn: 1,
                  gridRow: 2,
                  background: "gold",
                },
              },
            },
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default DatePicker;
