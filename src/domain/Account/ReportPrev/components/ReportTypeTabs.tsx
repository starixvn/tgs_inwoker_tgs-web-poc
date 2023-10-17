import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useReportTypeTabs } from "@/domain/Account/ReportPrev/hooks/useReportTypeTabs";
import { theme } from "@/theme";

const ReportTypeTabsContainer = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
`;

type TabButtonProps = {
  $isSelected: boolean;
};

const TabButton = styled.button<TabButtonProps>`
  background: ${({ $isSelected }: TabButtonProps) => {
    return $isSelected
      ? `linear-gradient(180deg, #922ACF 0%, #2F26AD 100%)`
      : "none";
  }};
  color: ${({ $isSelected }: TabButtonProps) => {
    return $isSelected ? theme.white : theme.tertiaryLight;
  }};
  padding: 13px 23px;
  width: calc((100% - 2 * 9px) / 3);
  border: ${({ $isSelected, theme }: TabButtonProps) => {
    return $isSelected ? "none" : `1px solid ${theme.tertiaryLight}`;
  }};
  border-radius: 5px;
  font-size: 0.937rem;
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
