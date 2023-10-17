import React, { useCallback, useEffect, useMemo, useState } from "react";
import Tabs, { TabItem } from "@/components/UI/Tabs";
import i18n from "@/utils/i18n";
import { useTab } from "@/hooks/account/useTab";
import styled from "styled-components";
import { useRoute } from "@/components/Mobile/hooks/useRoute";
import { useHistory } from "react-router-dom";

const TransferTabsContainer = styled.div`
  & .tab {
    padding: 14px 52px;
  }
`;

type Props = {};
const TransferTabs = (props: Props) => {
  const { route } = useRoute();
  const history = useHistory();

  const tabList = useMemo<TabItem[]>(() => {
    return [
      {
        label: i18n.t("common.deposit"),
        value: "/deposit",
      },
      { label: i18n.t("common.withdrawal"), value: "/withdrawal" },
    ] as TabItem[];
  }, []);

  const initTab = route.path.includes("deposit") ? tabList[0] : tabList[1];
  const [selectedTab, setSelectedTab] = useState<TabItem>(initTab);

  const handleTabChange = useCallback((newTabItem: TabItem) => {
    // setSelectedTab(newValue);
    history.push(newTabItem.value);
  }, []);

  return (
    <TransferTabsContainer>
      <Tabs
        tabItemList={tabList}
        selectedTabItem={selectedTab}
        handleChange={handleTabChange}
      />
    </TransferTabsContainer>
  );
};

export default React.memo(TransferTabs);
