import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNav, { BottomNavItem } from "./BottomNav";
import { useHistory, useLocation } from "react-router-dom";
import { AppHistory } from "@/history/History";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: 82px;
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: #181f2b;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
`;

const bottomNavItemList: BottomNavItem[] = [
  {
    navType: "item",
    label: "Home",
    iconUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_home.svg`,
    iconActiveUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_home_active.svg`,
    routePath: "/main/home",
  },
  {
    navType: "item",
    label: "Refer",
    iconUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_refer.svg`,
    iconActiveUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_refer_active.svg`,
    routePath: "/promotion-list",
  },
  {
    navType: "item",
    label: "Promotion",
    iconUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_promotion.svg`,
    iconActiveUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_promotion_active.svg`,
    routePath: "/main/home",
  },
  {
    navType: "item",
    label: "Email",
    iconUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_email.svg`,
    iconActiveUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_email_active.svg`,
    routePath: "/main/support",
  },
  {
    navType: "item",
    label: "Mine",
    iconUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_mine.svg`,
    iconActiveUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_mine_active.svg`,
    routePath: "/account",
  },
];

const BottomAppBar = () => {
  const [selectedBottomNavItem, setSelectedBottomNavItem] =
    useState<null | BottomNavItem>(null);
  const history = useHistory();

  useEffect(() => {
    const currentPathname = history.location.pathname;
    const matchNavItem = bottomNavItemList.find(
      (bottomNavItem) => bottomNavItem.routePath === currentPathname
    );

    setSelectedBottomNavItem(matchNavItem || null);
  }, []);

  const handleClick = (appBarItem: BottomNavItem) => {
    setSelectedBottomNavItem(appBarItem);
    AppHistory.push(appBarItem.routePath);
  };

  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.label}
            bottomNavItem={bottomNavItem}
            onClick={() => handleClick(bottomNavItem)}
            isSelected={selectedBottomNavItem?.label === bottomNavItem.label}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;
