import { themeList } from "@/theme";
import { Tab as MuiTab, Tabs as MuiTabs } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
const theme = themeList["mobileT18"];

const StyledTabs = styled(MuiTabs)`
  background: ${theme.primaryLight};
  border-radius: 12px;
`;

const StyledTab = styled(MuiTab)`
  & .MuiTab-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-transform: none;
    background: ${theme.primaryLight};
    font-size: 0.875rem;

    & > * {
      display: inline-block;
    }
  }

  & img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    margin-bottom: 0 !important;
  }

  & .Mui-selected {
    color: white !important;
  }
`;

export interface TabItem {
    label: string;
    value: "account" | "info";
    icon?: string | React.ReactElement;
}
type Props = {
    tabItemList: TabItem[];
    value: TabItem;
    handleChange: (event: React.ChangeEvent<{}>, newValue: TabItem) => void;
};
const Tabs = ({ tabItemList, value, handleChange }: Props) => {
    return (
        <StyledTabs value={value} onChange={handleChange}>
            {tabItemList.map((tabItem) => {
                const { label, icon } = tabItem;
                return (
                    <StyledTab
                        key={label}
                        label={label}
                        icon={icon || ""}
                        value={tabItem}
                    />
                );
            })}
        </StyledTabs>
    );
};

export default Tabs;
