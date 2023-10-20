import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import InfoCard from "@/components/Account/InfoCard";
import Tabs, { TabItem } from "@/components/UI/Tabs";
import accountImg from "@/assets/images/account/icon_account.png";
import infoImg from "@/assets/images/account/icon_info.png";
import { useTab } from "@/hooks/account/useTab";
import AccountNavigations from "@/components/Account/AccountNavigations";
import { useAuth } from "@/hooks/auth/useAuth";
import { useHistory } from "react-router-dom";
import MyInfo from "@/components/Account/MyInfo";
import i18n from "@/utils/i18n";
import { media } from "@/theme/breakpoints";

const AccountContainer = styled.div`
  background: ${({ theme }) => theme.primaryDark};
  padding: 40px 15px 0;
  max-width: 870px;
  margin: auto;

  & > div {
    margin-bottom: 15px;
  }

  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
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
