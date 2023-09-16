import React from "react";
import styled from "styled-components";
import infoImg from "@/assets/images/account/icon_info.png";
import NavCard from "@/components/Mobile/components/Account/AccountNavigations/NavCard";

const AccountNavigationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export interface AccountNavigation {
  label: string;
  iconUrl: string;
}

const accountNavigationList: AccountNavigation[] = [
  {
    label: "Account",
    iconUrl: infoImg,
  },
  {
    label: "Account",
    iconUrl: infoImg,
  },
  {
    label: "Account",
    iconUrl: infoImg,
  },
  {
    label: "Account",
    iconUrl: infoImg,
  },
  {
    label: "Account",
    iconUrl: infoImg,
  },
  {
    label: "Account",
    iconUrl: infoImg,
  },
  {
    label: "Account",
    iconUrl: infoImg,
  },
  {
    label: "Account",
    iconUrl: infoImg,
  },
];

type Props = {};

const AccountNavigations = (props: Props) => {
  return (
    <AccountNavigationsContainer>
      {accountNavigationList.map((accountNavigation) => {
        const { label, iconUrl } = accountNavigation;
        return <NavCard label={label} iconUrl={iconUrl} />;
      })}
    </AccountNavigationsContainer>
  );
};

export default AccountNavigations;
