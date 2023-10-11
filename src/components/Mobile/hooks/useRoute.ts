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

  const routeRegex = routePath
    .replace(/\//g, "\\/")
    .replace(/:[^/?]+/g, "([^/]+)")
    .replace(/\?/g, "\\?"); // 修正這一行

  const regex = new RegExp(`^${routeRegex}$`);

  return regex.test(currentPath);
}

function getCurrentRoute(currentPath: string) {
  return (
    routes.find((route) => {
      return compareRoutePathAndCurrentPathIsEqual(route.path, currentPath);
    }) || null
  );
}

// TODO: make useRoute more accurate
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
