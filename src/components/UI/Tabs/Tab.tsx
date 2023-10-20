import React from "react";
import { TabItem } from "@/components/UI/Tabs/index";
import styled from "styled-components";
import { theme } from "@/theme";

type TabContainerProps = {
  $isActive: boolean;
};
const TabContainer = styled.div<TabContainerProps>`
  cursor: pointer;
  flex: 1;
  padding: 7px;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  line-height: 0.875rem;
  font-weight: 700;
  color: ${({ $isActive }: TabContainerProps) =>
    $isActive ? theme.white : theme.tertiaryMiddle};
  background: ${({ $isActive }: TabContainerProps) =>
    $isActive ? "linear-gradient(180deg, #922ACF 0%, #2F26AD 100%)" : "none"};
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;

  & img {
    width: 100%;
    object-fit: cover;
  }
`;

type Props = {
  tabItem: TabItem;
  handleClick: () => void;
  isActive: boolean;
};
const Tab = ({ tabItem, handleClick, isActive }: Props) => {
  const { label, icon, value } = tabItem;

  const IconComponent = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <IconContainer $isActive={isActive}>
          <img src={icon} alt={value} />
        </IconContainer>
      );
    }

    return icon;
  };

  return (
    <TabContainer className={"tab"} onClick={handleClick} $isActive={isActive}>
      <IconComponent />
      {label}
    </TabContainer>
  );
};

export default Tab;
