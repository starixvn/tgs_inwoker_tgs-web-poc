import { useState } from "react";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";

export interface DateRangeInfo {
  dateFrom: Date;
  dateTo: Date;
  dateRange: number;
}

export function useDateRange() {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  const [dateRangeInfo, setDateRangeInfo] = useState<DateRangeInfo>({
    dateFrom: today,
    dateTo: today,
    dateRange: 0,
  });

  const handleDateFromChange = (e: Date) =>
    setDateRangeInfo({ ...dateRangeInfo, dateFrom: e });

  const handleDateToChange = (e: Date) =>
    setDateRangeInfo({ ...dateRangeInfo, dateTo: e });

  const handleDateRangeChange = (dateRangeEnum: number) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let newDateFrom = today;

    switch (dateRangeEnum) {
      case 0:
        break;
      case 1:
        newDateFrom = addDays(today, -7);
        break;
      case 2:
        newDateFrom = addMonths(today, -1);
        break;
    }

    setDateRangeInfo({
      dateFrom: newDateFrom,
      dateTo: today,
      dateRange: dateRangeEnum,
    });
  };

  return {
    dateRangeInfo,
    handleDateFromChange,
    handleDateToChange,
    handleDateRangeChange,
  };
}
