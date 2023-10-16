import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import InfoCard from "@/components/Mobile/components/Account/InfoCard";
import Tabs, { TabItem } from "@/components/Mobile/components/UI/Tabs";
import accountImg from "@/assets/images/account/icon_account.png";
import infoImg from "@/assets/images/account/icon_info.png";
import { useTab } from "@/hooks/account/useTab";
import AccountNavigations from "@/components/Mobile/components/Account/AccountNavigations";
import { useAuth } from "@/hooks/auth/useAuth";
import { useHistory } from "react-router-dom";
import MyInfo from "@/components/Mobile/components/Account/MyInfo";
import i18n from "@/utils/i18n";

const AccountContainer = styled.div`
  background: ${({ theme }) => theme.primaryDark};
  padding: 40px 15px;
`;

const AccountIcon = () => {
  return <img src={accountImg} alt="account" />;
};

const InfoIcon = () => {
  return <img src={infoImg} alt="info" />;
};

const Mine = () => {
  const tabList = useMemo<TabItem[]>(() => {
    return [
      {
        label: i18n.t("TIGER.my"),
        value: "account",
        icon: <AccountIcon />,
      },
      { label: i18n.t("common.info"), value: "info", icon: <InfoIcon /> },
    ] as TabItem[];
  }, []);
  const { selectedTab, handleTabChange } = useTab(tabList);
  const { isLogin } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, []);

  return (
    <AccountContainer>
      <InfoCard style={{ marginBottom: "50px" }} />

      <Tabs
        tabItemList={tabList}
        selectedTabItem={selectedTab}
        handleChange={handleTabChange}
      />

      {selectedTab.value === "account" && <AccountNavigations />}
      {selectedTab.value === "info" && <MyInfo />}
    </AccountContainer>
  );
};

export default Mine;
