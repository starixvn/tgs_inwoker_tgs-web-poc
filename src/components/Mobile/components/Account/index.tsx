import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { themeList } from "@/theme";
import InfoCard from "@/components/Mobile/components/Account/InfoCard";
import Tabs, { TabItem } from "@/components/Mobile/components/UI/Tabs";
import accountImg from "@/assets/images/account/icon_account.png";
import infoImg from "@/assets/images/account/icon_info.png";
import AccountLevelInfoCard from "@/components/Mobile/components/Account/AccountLevelInfoCard";
import { NavCardItem } from "@/components/Mobile/components/Account/AccountNavs/NavCard";
import ProfileDialog from "@/components/Mobile/components/Account/ProfileDialog";
import { useTab } from "@/components/Mobile/components/Account/hooks/useTab";
import AccountNavs from "@/components/Mobile/components/Account/AccountNavs";

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
  const { selectedTab, handleTabChange } = useTab(tabList);
  return (
    <>
      <AccountContainer>
        <InfoCard style={{ marginBottom: "50px" }} />

        <Tabs
          tabItemList={tabList}
          value={selectedTab}
          handleChange={handleTabChange}
        />

        {selectedTab.value === "account" && <AccountNavs />}

        {selectedTab.value === "info" && (
          <AccountLevelInfoContainer>
            <AccountLevelInfoCard />
          </AccountLevelInfoContainer>
        )}
      </AccountContainer>
    </>
  );
};

export default Account;
