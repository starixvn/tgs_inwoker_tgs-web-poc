import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useNavigate } from "@/hooks/pageProps/useNavigate";
import { useCallback } from "react";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { useGetSupportUrl } from "@/hooks/pageProps/useGetSupportUrl";
import { useHistory } from "react-router-dom";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useLocation } from "react-router";

export function usePageProps() {
  // general
  const { alert } = useNotifications();
  const { navigate } = useNavigate();
  const { getSupportUrl } = useGetSupportUrl();
  const { ui } = useUiStore();
  const history = useHistory();
  const { getBrandCommunication } = useGeneralStore();
  const location = useLocation();

  // TODO: complete popup
  const popup = useCallback(() => {
    console.log("this.handleOpenPopup");
  }, []);

  // specific to routePath

  // if (route.path === "/deposit/manual")
  const order = location.state;

  // if (route.path === "/ip-restrict-mobile")
  const ip = location.state?.ip || null;

  // if (route.path === "/promotion/:activityId?")
  const promo = location.state?.promo || null;

  // if (route.path === "/chat/:userid?/:name?/:question?")
  const login = location.state?.login || null;

  // if (route.path === "/forgot-password/option")
  const details = location.state?.details || null;

  // if (route.path === "/forgot-password/reset")
  const forget_token = location.state?.forget_token || null;

  // if (route.path === "/card/name")
  const from = location.state?.from || null;

  return {
    // general
    alert,
    navigate,
    popup,
    screenWidth: ui.screenWidth,
    screenHeight: ui.screenHeight,
    getSupportUrl,
    appHistory: history,
    brandComm: getBrandCommunication,
    // specific to routePath
    ip,
    promo,
    order,
    login,
    details,
    forget_token,
    from,
  };
}
