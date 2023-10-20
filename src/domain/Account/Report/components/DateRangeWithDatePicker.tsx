import React, { useMemo } from "react";
import DatePicker from "@/components/UI/DatePicker";

import styled from "styled-components";
import addDays from "date-fns/addDays";
import { media } from "@/theme/breakpoints";

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
        </DateInner>

        <DateSpliter>-</DateSpliter>

        <DateInner>
          {/*<DateLabel>{i18n.t("report.endDate")}</DateLabel>*/}

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
        </DateInner>
      </FlatStraightLine>
      {/*<div className="clear"></div>*/}
    </DateContainer>
  );
};

export default DateRangeWithDatePicker;
