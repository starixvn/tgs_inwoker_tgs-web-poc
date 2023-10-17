import React from "react";
import styled from "styled-components";
import Tab from "@/components/UI/Tabs/Tab";

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px;
  background: ${({ theme }) => theme.primaryLight};
`;

export interface TabItem {
  label: string;
  value: any;
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
