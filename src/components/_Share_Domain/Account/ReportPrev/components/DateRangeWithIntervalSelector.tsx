import React from "react";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const DateRangContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
`;

type DateRangSelectionTypes = {
  isSelected: boolean;
};
const DateRangSelection = styled.div<DateRangSelectionTypes>`
  background: ${({ isSelected }: DateRangSelectionTypes) => {
    return isSelected
      ? `linear-gradient(180deg, #922ACF 0%, #2F26AD 100%)`
      : "none";
  }};
  color: ${({ isSelected }: DateRangSelectionTypes) => {
    return isSelected ? theme.white : theme.tertiaryLight;
  }};
  padding: 13px 23px;
  border: ${({ isSelected }: DateRangSelectionTypes) => {
    return isSelected ? "none" : `1px solid ${theme.tertiaryLight}`;
  }};
  border-radius: 5px;
  font-size: 0.937rem;
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
        isSelected={dateRange === DateRangeEnum.TODAY}
      >
        {i18n.t("report.today")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.WEEKLY)}
        isSelected={dateRange === DateRangeEnum.WEEKLY}
      >
        {i18n.t("report.oneWeek")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.MONTHLY)}
        isSelected={dateRange === DateRangeEnum.MONTHLY}
      >
        {i18n.t("report.oneMonth")}
      </DateRangSelection>
    </DateRangContainer>
  );
};

export default DateRangeWithIntervalSelector;
