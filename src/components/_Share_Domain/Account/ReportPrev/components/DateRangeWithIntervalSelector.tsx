import React from "react";
import i18n from "@/utils/i18n";
import styled from "styled-components";

const DateRangContainer = styled.div`
  margin-top: 20px;
`;
const DateRangSelection = styled.div`
  float: left;
  font-weight: 600;

  letter-spacing: normal;
  text-align: center;
  font-size: 32px;
  ${(props) =>
    props.selected
      ? `  
  color: ` +
        props.theme.primary +
        `;`
      : `

  color: ` +
        props.theme.secondary +
        `;`}
`;

export enum DateRangeEnum {
  TODAY,
  WEEKLY,
  MONTHLY,
}

type Props = {
  dateRange: DateRangeEnum;
  handleDateRangeChange: (dateRange: DateRangeEnum) => void;
};
const DateRangeWithIntervalSelector = ({
  dateRange,
  handleDateRangeChange,
}: Props) => {
  return (
    <DateRangContainer>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.TODAY)}
        selected={dateRange === DateRangeEnum.TODAY}
      >
        {i18n.t("report.today")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.WEEKLY)}
        selected={dateRange === DateRangeEnum.WEEKLY}
      >
        {i18n.t("report.oneWeek")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.MONTHLY)}
        selected={dateRange === DateRangeEnum.MONTHLY}
      >
        {i18n.t("report.oneMonth")}
      </DateRangSelection>
    </DateRangContainer>
  );
};

export default DateRangeWithIntervalSelector;
