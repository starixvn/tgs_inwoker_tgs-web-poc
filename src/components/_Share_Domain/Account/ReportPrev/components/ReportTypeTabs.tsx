import React, { ChangeEvent, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Tabs, Tab } from "@material-ui/core";
import { useReportTypeTabs } from "@/components/_Share_Domain/Account/ReportPrev/hooks/useReportTypeTabs";

const CustomTabs = styled(Tabs)`
  height: 80px;
  font-size: 25px;
  display: flex;

  .MuiTabs-fixed {
    overflow: overlay !important;
  }
`;

type Props = {
  selectedType: number;
  handleChangeTab: (e: ChangeEvent, newValue: number) => void;
};
const ReportTypeTabs = ({ selectedType, handleChangeTab }: Props) => {
  const { displayedTabList } = useReportTypeTabs();

  return (
    <CustomTabs value={selectedType} onChange={handleChangeTab}>
      {displayedTabList.map((reportTab) => {
        const { index, label } = reportTab;
        return (
          <Tab
            key={index}
            selected={index === selectedType}
            index={index}
            label={label}
            value={index}
          />
        );
      })}
    </CustomTabs>
  );
};

export default ReportTypeTabs;
