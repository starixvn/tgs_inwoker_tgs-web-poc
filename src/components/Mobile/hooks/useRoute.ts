import { useLocation } from "react-router";
import { Route, routes } from "@/components/Mobile/router";
import { useEffect, useState } from "react";

function compareRoutePathAndCurrentPathIsEqual(
  routePath: string,
  currentPath: string
) {
  //ex:
  // currentPath = /promotion/018af00e-0f30-0000-0002-07e7b5970319’
  // routePath = "/promotion/:id?"
  // it'll return true

  // 將路徑中的動態部分（:id）替換為正則表達式
  const regexRoutePath = routePath.replace(/:[^/]+/g, "[^/]+");

  // 將路徑中的斜杠轉義為正則表達式中的斜杠
  const escapedRoutePath = regexRoutePath.replace(/\//g, "\\/");

  // 構建正則表達式
  const regex = new RegExp(`^${escapedRoutePath}$`);

  // 使用正則表達式測試 currentPath
  return regex.test(currentPath);
}

function getCurrentRoute(currentPath: string) {
  return (
    routes.find((route) => {
      return compareRoutePathAndCurrentPathIsEqual(route.path, currentPath);
    }) || null
  );
}

export function useRoute() {
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState<Route>(
    getCurrentRoute(location.pathname)
  );

  useEffect(() => {
    setCurrentRoute(getCurrentRoute(location.pathname));
  }, [routes, location.pathname]);

  return {
    route: currentRoute,
  };
}
