import { themeList } from "@/theme";
import React from "react";
import styled from "styled-components";
import { rankingTabList } from "@/components/Mobile/constants/tab";
import TabButton from "@/components/Mobile/components/TabPanel/TabButton";
import Tab from "@/components/Mobile/components/UI/Tabs/Tab";
const theme = themeList["mobileT18"];

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px;
  background: ${theme.primaryLight};
`;

export interface TabItem {
  label: string;
  value: "account" | "info";
  icon?: string | React.ReactElement;
}
type Props = {
  tabItemList: TabItem[];
  selectedTabItem: TabItem;
  handleChange: (newValue: TabItem) => void;
};
const Tabs = ({ tabItemList, selectedTabItem, handleChange }: Props) => {
  return (
    <TabsContainer>
      {tabItemList.map((tabItem) => {
        return (
          <Tab
            key={tabItem.value}
            tabItem={tabItem}
            handleClick={() => handleChange(tabItem)}
            isActive={tabItem.value === selectedTabItem.value}
          />
        );
      })}
    </TabsContainer>
  );

  // return (
  //   <StyledTabs value={value} onChange={handleChange}>
  //     {tabItemList.map((tabItem) => {
  //       const { label, icon } = tabItem;
  //       return (
  //         <StyledTab
  //           key={label}
  //           label={label}
  //           icon={icon || ""}
  //           value={tabItem}
  //         />
  //       );
  //     })}
  //   </StyledTabs>
  // );
};

export default Tabs;
