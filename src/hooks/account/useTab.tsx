import React, { useCallback, useState } from "react";
import { TabItem } from "@/components/Mobile/components/UI/Tabs";

export function useTab<T>(tabList: T[]) {
  const [selectedTab, setSelectedTab] = useState<T>(tabList[0]);

  const handleTabChange = useCallback(
    (_event: React.ChangeEvent<{}>, newValue: T) => {
      setSelectedTab(newValue);
    },
    []
  );

  return {
    selectedTab,
    handleTabChange,
  };
}
