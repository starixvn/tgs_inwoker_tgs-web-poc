import styled from "styled-components";
import ContextMenuItem from "./ContextMenuItem";

const contextMenuList = [
  {
    label: "My Account",
    iconUrl: process.env.PUBLIC_URL + `/assets/images/mobile/contextMenu/icon_my_account.svg`,
    routePath: "/account",   
  },
  {
    label: "Service/Support",
    iconUrl: process.env.PUBLIC_URL + `/assets/images/mobile/contextMenu/icon_service_support.svg`,
    routePath: "/main/support", // TODO: handle support
  },
  {
    label: "Logout",
    iconUrl: process.env.PUBLIC_URL + `/assets/images/mobile/contextMenu/icon_logout.svg`,
    routePath: "/logout", // TODO: handle logout
  }
]

const ContextMenuContainer = styled.div`
    width: 272px;
    padding: 22px 12px;
    background: #212937;
    border-radius: 10px;
    position: fixed;
    top: 75px;
    right: 5px;
    z-index: 99;
`
const ContextMenuItemWrapper = styled.div`
    display: grid;
    gap: 10px;
`
const VersionTagContainer = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 0.75rem;
  margin-top: 10px;
`

const ContextMenu = () => {

  const handleClick = (routerPath: string) => {
      console.log("handleClick", routerPath)
  }
    
  return (
    <ContextMenuContainer>
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
            )
        })}
      </ContextMenuItemWrapper>
      <VersionTagContainer>
        V1.1.3795703
      </VersionTagContainer>
    </ContextMenuContainer>
  )
}

export default ContextMenu