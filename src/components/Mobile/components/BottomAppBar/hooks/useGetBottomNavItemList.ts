import { useEffect, useMemo, useState } from "react";
import i18n from "@/utils/i18n";
import { RouteCategoryEnum } from "@/components/Mobile/router";
import { BottomNavItem } from "@/components/Mobile/components/BottomAppBar/BottomNav";
import { useRoute } from "@/components/Mobile/hooks/useRoute";
import { AppHistory } from "@/history/History";
import { useLocation } from "react-router";

export function useGetBottomNavItemList() {
  const location = useLocation();
  const bottomNavItemList = useMemo(() => {
    return [
      {
        navType: "item",
        label: i18n.t("common.home"),
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
        label: i18n.t("affiliate.title"),
        iconUrl:
          process.env.PUBLIC_URL +
          `/assets/images/mobile/bottomAppBar/icon_refer.svg`,
        iconActiveUrl:
          process.env.PUBLIC_URL +
          `/assets/images/mobile/bottomAppBar/icon_refer_active.svg`,
        routePath: "/affiliate",
        routeCategory: RouteCategoryEnum.REFER,
      },
      {
        navType: "item",
        label: i18n.t("common.promotion"),
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
        label: i18n.t("inbox.title"),
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
        label: i18n.t("web.account.profile"),
        iconUrl:
          process.env.PUBLIC_URL +
          `/assets/images/mobile/bottomAppBar/icon_mine.svg`,
        iconActiveUrl:
          process.env.PUBLIC_URL +
          `/assets/images/mobile/bottomAppBar/icon_mine_active.svg`,
        routePath: "/account",
        routeCategory: RouteCategoryEnum.MINE,
      },
    ] as BottomNavItem[];
  }, []);

  const [selectedBottomNavItem, setSelectedBottomNavItem] =
    useState<BottomNavItem | null>(null);
  const { route } = useRoute();

  useEffect(() => {
    const matchNavItem =
      bottomNavItemList.find((bottomNavItem) => {
        return bottomNavItem.routeCategory === route?.category;
      }) || null;

    if (!matchNavItem) {
      console.log(location.pathname);
      return;
    }

    setSelectedBottomNavItem(matchNavItem);
  }, [route]);

  const handleClickBottomNavItem = (appBarItem: BottomNavItem) => {
    setSelectedBottomNavItem(appBarItem);
    AppHistory.push(appBarItem.routePath);
  };

  return {
    bottomNavItemList,
    selectedBottomNavItem,
    handleClickBottomNavItem,
  };
}
