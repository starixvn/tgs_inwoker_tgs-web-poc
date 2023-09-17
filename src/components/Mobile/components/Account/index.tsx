import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { themeList } from "@/theme";
import InfoCard from "@/components/Mobile/components/Account/InfoCard";
import Tabs, { TabItem } from "@/components/Mobile/components/Tabs";
import accountImg from "@/assets/images/account/icon_account.png";
import infoImg from "@/assets/images/account/icon_info.png";
import BalanceTracker from "@/components/Mobile/components/BalanceTracker";
import AccountNavigations from "@/components/Mobile/components/Account/AccountNavigations";
import AppDownloadButton from "@/components/Mobile/components/Account/AppDownloadButton";
import Button from "@/components/Mobile/components/Button";
import LanguageSwitch from "@/components/Mobile/components/LanguageSwitch";
import AccountLevelInfoCard from "@/components/Mobile/components/Account/AccountLevelInfoCard";

const theme = themeList["mobileT18"];

const AccountContainer = styled.div`
  background: ${theme.primaryDark};
  padding: 40px 15px;
`;

const AccountNavContainer = styled.div`
  padding: 15px 0 0;
  & > * {
    margin-bottom: 8px;
  }
  & > *:first-child {
    margin-bottom: 16px;
  }
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

type Props = {};
const Account = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabList[0]);

  const handleTabChange = useCallback(
    (_event: React.ChangeEvent<{}>, newValue: TabItem) => {
      setSelectedTab(newValue);
    },
    []
  );

  return (
    <AccountContainer>
      <InfoCard style={{ marginBottom: "50px" }} />

      <Tabs
        tabItemList={tabList}
        value={selectedTab}
        handleChange={handleTabChange}
      />

      {selectedTab.value === "account" && (
        <AccountNavContainer>
          <BalanceTracker />
          <AccountNavigations />
          <LanguageSwitch />
          <Button fullWidth>Logout</Button>
        </AccountNavContainer>
      )}

      {selectedTab.value === "info" && (
        <AccountLevelInfoContainer>
          <AccountLevelInfoCard />
        </AccountLevelInfoContainer>
      )}
    </AccountContainer>
  );
};

export default Account;
