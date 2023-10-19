import React, { useMemo } from "react";
import i18n from "@/utils/i18n";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@/components/UI/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import styled from "styled-components";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import addDays from "date-fns/addDays";
import { media } from "@/theme/breakpoints";

const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

const DateContainer = styled.div`
  width: 100%;

  ${media.sm} {
    width: auto;
  }
`;

const FlatStraightLine = styled.div`
  display: flex;
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
  max-width: 168px;

  border: 1px solid ${({ theme }) => theme.tertiaryLight};
  border-radius: 5px;

  & input {
    color: ${({ theme }) => theme.tertiaryLight};
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
      <FlatStraightLine>
        <DateInner>
          {/*<DateLabel>{i18n.t("report.startDate")}</DateLabel>*/}
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
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
          </LocalizationProvider>
        </DateInner>

        <DateSpliter>-</DateSpliter>

        <DateInner>
          {/*<DateLabel>{i18n.t("report.endDate")}</DateLabel>*/}
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
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
          </LocalizationProvider>
        </DateInner>
      </FlatStraightLine>
      {/*<div className="clear"></div>*/}
    </DateContainer>
  );
};

export default DateRangeWithDatePicker;
