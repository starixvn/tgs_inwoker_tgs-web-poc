import styled from "styled-components";
import ContextMenuItem from "./ContextMenuItem";
import { useAuth } from "@/hooks/auth/useAuth";
import { useHistory } from "react-router-dom";
import Avatar from "@/components/Avatar";
import { useMemo } from "react";
import i18n from "@/utils/i18n";

const ContextMenuContainer = styled.div`
  width: 272px;
  padding: 22px 12px;
  background: #212937;
  border-radius: 10px;
  position: fixed;
  top: 75px;
  right: 5px;
  z-index: 99;
`;
const ContextMenuItemWrapper = styled.div`
  display: grid;
  gap: 10px;
`;
const VersionTagContainer = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 0.75rem;
  margin-top: 10px;
`;
const AvatarLevelWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ContextMenu = () => {
  const { handleLogout, logoutState } = useAuth();
  const history = useHistory();

  const contextMenuList = useMemo(() => {
    return [
      {
        label: i18n.t("wap.main.my"),
        iconUrl:
          process.env.PUBLIC_URL +
          `/assets/images/mobile/contextMenu/icon_my_account.svg`,
        routePath: "/account",
      },
      {
        label: i18n.t("support.online"),
        iconUrl:
          process.env.PUBLIC_URL +
          `/assets/images/mobile/contextMenu/icon_service_support.svg`,
        routePath: "/main/support", // TODO: handle support
      },
      {
        label: i18n.t("wap.main.account.signout"),
        iconUrl:
          process.env.PUBLIC_URL +
          `/assets/images/mobile/contextMenu/icon_logout.svg`,
        routePath: "/logout", // TODO: handle logout
      },
    ];
  }, []);

  const handleClick = async (routerPath: string) => {
    switch (routerPath) {
      case "/logout":
        await handleLogout();
        break;

      case "/account":
        history.push("/account");
        break;

      case "/main/support":
        history.push("/support");
        break;
    }
  };

  return (
    <ContextMenuContainer>
      <AvatarLevelWrapper>
        <Avatar />
      </AvatarLevelWrapper>
      <ContextMenuItemWrapper>
        {contextMenuList.map((contextMenuItem) => {
          const { label, iconUrl, routePath } = contextMenuItem;
          return (
            <ContextMenuItem
              key={label}
              label={label}
              iconUrl={iconUrl}
              onClick={() => handleClick(routePath)}
            />
          );
        })}
      </ContextMenuItemWrapper>
      <VersionTagContainer>V1.1.3795703</VersionTagContainer>
    </ContextMenuContainer>
  );
};

export default ContextMenu;
