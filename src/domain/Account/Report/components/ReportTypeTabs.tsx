import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useReportTypeTabs } from "@/domain/Account/Report/hooks/useReportTypeTabs";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const ReportTypeTabsContainer = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
`;

type TabButtonProps = {
  $isSelected: boolean;
};

const TabButton = styled.button<TabButtonProps>`
  white-space: nowrap;
  cursor: pointer;
  background: ${({ $isSelected }: TabButtonProps) => {
    return $isSelected
      ? `linear-gradient(180deg, #922ACF 0%, #2F26AD 100%)`
      : "none";
  }};
  color: ${({ $isSelected }: TabButtonProps) => {
    return $isSelected ? theme.white : theme.tertiaryLight;
  }};
  padding: 13px 23px;
  border: ${({ $isSelected, theme }: TabButtonProps) => {
    return $isSelected ? "none" : `1px solid ${theme.tertiaryLight}`;
  }};
  border-radius: 5px;
  font-size: 0.937rem;
  width: calc((100% - 2 * 9px) / 3);
  min-width: 125px;

  ${media.sm} {
    width: calc((100% - 5 * 9px) / 6);
  }
`;

type Props = {
  selectedType: number;
  handleChangeTab: (e: ChangeEvent, newValue: number) => void;
};
const ReportTypeTabs = ({
  selectedType,
  handleChangeTab,
  ...others
}: Props) => {
  const { displayedTabList } = useReportTypeTabs();

  const handleButtonClick = (newIndex: number) => {
    handleChangeTab({} as ChangeEvent, newIndex);
  };

  return (
    //@ts-ignore
    <ReportTypeTabsContainer {...others}>
      {displayedTabList.map((reportTab) => {
        const { index, label } = reportTab;
        return (
          <TabButton
            key={index}
            $isSelected={index === selectedType}
            onClick={() => handleButtonClick(index)}
          >
            {label}
          </TabButton>
        );
      })}
    </ReportTypeTabsContainer>
  );
};

export default ReportTypeTabs;
