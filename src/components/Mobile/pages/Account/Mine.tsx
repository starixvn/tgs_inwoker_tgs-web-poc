import React, { useEffect } from "react";
import styled from "styled-components";
import { themeList } from "@/theme";
import InfoCard from "@/components/Mobile/components/Account/InfoCard";
import Tabs, { TabItem } from "@/components/Mobile/components/UI/Tabs";
import accountImg from "@/assets/images/account/icon_account.png";
import infoImg from "@/assets/images/account/icon_info.png";
import AccountLevelInfoCard from "@/components/Mobile/components/Account/AccountLevelInfoCard";
import { useTab } from "@/hooks/account/useTab";
import AccountNavigations from "@/components/Mobile/components/Account/AccountNavigations";
import { useAuth } from "@/hooks/auth/useAuth";
import { useHistory } from "react-router-dom";

const theme = themeList["mobileT18"];

const AccountContainer = styled.div`
  background: ${theme.primaryDark};
  padding: 40px 15px;
`;

const AccountLevelInfoContainer = styled.div`
  padding: 15px 0 0;

  & > * {
    margin-bottom: 8px;
  }
`;

const AccountIcon = () => {
  return <img src={accountImg} alt="account" />;
};

const InfoIcon = () => {
  return <img src={infoImg} alt="info" />;
};

const tabList: TabItem[] = [
  {
    label: "My Account",
    value: "account",
    icon: <AccountIcon />,
  },
  { label: "My Info", value: "info", icon: <InfoIcon /> },
];

const Mine = () => {
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
        value={selectedTab}
        handleChange={handleTabChange}
      />

      {selectedTab.value === "account" && <AccountNavigations />}

      {selectedTab.value === "info" && (
        <AccountLevelInfoContainer>
          <AccountLevelInfoCard />
        </AccountLevelInfoContainer>
      )}
    </AccountContainer>
  );
};

export default Mine;
