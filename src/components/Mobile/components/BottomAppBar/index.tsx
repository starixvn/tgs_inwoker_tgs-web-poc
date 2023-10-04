import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNav, { BottomNavItem } from "./BottomNav";
import { useLocation } from "react-router-dom";
import { AppHistory } from "@/history/History";
import { useRoute } from "@/components/Mobile/hooks/useRoute";
import { RouteCategoryEnum } from "@/components/Mobile/router";

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
    routePath: "/",
    routeCategory: RouteCategoryEnum.HOME,
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
    routeCategory: RouteCategoryEnum.REFER,
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
    routePath: "/promotion-list",
    routeCategory: RouteCategoryEnum.PROMOTION,
  },
  {
    navType: "item",
    label: "Inbox",
    iconUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_email.svg`,
    iconActiveUrl:
      process.env.PUBLIC_URL +
      `/assets/images/mobile/bottomAppBar/icon_email_active.svg`,
    routePath: "/inbox",
    routeCategory: RouteCategoryEnum.INBOX,
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
    routeCategory: RouteCategoryEnum.MINE,
  },
];

const BottomAppBar = () => {
  const [selectedBottomNavItem, setSelectedBottomNavItem] =
    useState<null | BottomNavItem>(null);
  const location = useLocation();
  const { route } = useRoute();

  useEffect(() => {
    const matchNavItem = bottomNavItemList.find(
      (bottomNavItem) => bottomNavItem.routeCategory === route.category
    );

    setSelectedBottomNavItem(matchNavItem || null);
  }, [route]);

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
