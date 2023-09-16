import React, { useCallback } from "react";
import styled from "styled-components";
import infoImg from "@/assets/images/account/icon_info.png";
import NavCard, {
  NavCardItem,
} from "@/components/Mobile/components/Account/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/Mobile/components/Account/AppDownloadButton";

const AccountNavigationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const navCardItemList: NavCardItem[] = [
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

const AccountNavigations = () => {
  const handleClickNav = useCallback((navCardItem: NavCardItem) => {}, []);

  return (
    <AccountNavigationsContainer>
      {navCardItemList.map((navCardItem, index) => {
        return (
          <NavCard
            key={index}
            navCardItem={navCardItem}
            handleClick={handleClickNav}
          />
        );
      })}

      <AppDownloadButton />
    </AccountNavigationsContainer>
  );
};

export default AccountNavigations;
