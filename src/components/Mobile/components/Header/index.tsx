import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "@/components/Mobile/components/Header/MenuButton";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import AnonymousHeaderContent from "@/components/Mobile/components/Header/AnonymousHeaderContent";
import AccountHeaderContent from "@/components/Mobile/components/Header/AccountHeaderContent";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #181f2b;
  height: 80px;
  width: 100%;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const LogoImgContainer = styled.div`
  height: 27px;
  justify-self: start;
  padding: 0 10px;

  & > img {
    height: 100%;
  }
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;
`;

type Props = {};
const Header = (props: Props) => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuButton />

        <Link to={"/"}>
          <LogoImgContainer>
            <img src={general.brand && general.brand.loadingUrl} alt={"logo"} />
          </LogoImgContainer>
        </Link>

        <HeaderContentContainer>
          {noLoginAccount ? (
            <AnonymousHeaderContent />
          ) : (
            <AccountHeaderContent />
          )}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
