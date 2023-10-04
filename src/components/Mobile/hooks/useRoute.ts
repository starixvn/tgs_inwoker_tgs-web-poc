import { useLocation } from "react-router";
import { Route, routes } from "@/components/Mobile/router";
import { useEffect, useState } from "react";

function getCurrentRoute(currentPath: string) {
  return (
    routes.find((route) => {
      return route.path.includes(currentPath);
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
