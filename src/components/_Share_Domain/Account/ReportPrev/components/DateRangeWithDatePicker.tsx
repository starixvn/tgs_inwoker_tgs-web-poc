import React, { useMemo } from "react";
import i18n from "@/utils/i18n";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import addDays from "date-fns/addDays";
import { themeList } from "@/theme";
import { DatePicker } from "@/components/Mobile/components/UI/DatePicker";
const theme = themeList["mobileT18"];

const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

const DateContainer = styled.div``;

const DateTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.465rem;
  color: ${theme.white};
  margin-bottom: 20px;
`;

const FlatStraightLine = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateSpliter = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #4a4a4a;
  width: 48px;
  text-align: center;
`;
const DateInner = styled.div`
  padding: 10px;

  border: 1px solid ${theme.tertiaryLight};
  border-radius: 5px;

  & input {
    color: ${theme.tertiaryLight};
    padding: 0;
  }
`;

type Props = {
  dateFrom: Date;
  handleDateFromChange: (newDate?: Date) => void;
  dateTo: Date;
  handleDateToChange: (newDate?: Date) => void;
  selectedType: number;
};

const DateRangeWithDatePicker = ({
  dateFrom,
  handleDateFromChange,
  dateTo,
  handleDateToChange,
  selectedType,
  ...others
}: Props) => {
  const minDateFrom = useMemo(() => {
    switch (selectedType) {
      case 8:
        return addDays(new Date(dateTo), -44);
      default:
        return undefined;
    }
  }, [selectedType, dateTo]);

  const maxDateTo = useMemo(() => {
    switch (selectedType) {
      case 8:
        return addDays(new Date(dateTo), 44) > new Date()
          ? new Date()
          : addDays(new Date(dateTo), 44);
      default:
        return new Date();
    }
  }, [selectedType, dateTo]);
  return (
    //@ts-ignore
    <DateContainer {...others}>
      <DateTitle>{i18n.t("report.date")}</DateTitle>

      <FlatStraightLine>
        <DateInner>
          {/*<DateLabel>{i18n.t("report.startDate")}</DateLabel>*/}
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={localeMap[i18n.language.substring(0, 2)]}
          >
            <DatePicker
              autoOk
              clearable
              disableFuture
              minDate={minDateFrom}
              maxDate={dateTo}
              format="yyyy/MM/dd"
              value={dateFrom}
              onChange={handleDateFromChange}
            />
          </MuiPickersUtilsProvider>
        </DateInner>

        <DateSpliter>-</DateSpliter>

        <DateInner>
          {/*<DateLabel>{i18n.t("report.endDate")}</DateLabel>*/}
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={localeMap[i18n.language.substring(0, 2)]}
          >
            <DatePicker
              autoOk
              clearable
              disableFuture
              minDate={dateFrom}
              maxDate={maxDateTo}
              format="yyyy/MM/dd"
              value={dateTo}
              onChange={handleDateToChange}
            />
          </MuiPickersUtilsProvider>
        </DateInner>
      </FlatStraightLine>
      <div className="clear"></div>
    </DateContainer>
  );
};

export default DateRangeWithDatePicker;
