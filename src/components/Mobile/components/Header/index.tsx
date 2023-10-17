import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "@/components/Mobile/components/Header/components/MenuButton";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import AnonymousHeaderContent from "@/components/Mobile/components/Header/components/AnonymousHeaderContent";
import AccountHeaderContent from "@/components/Mobile/components/Header/components/AccountHeaderContent";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { media } from "@/theme/breakpoints";
import HeaderBg from "@/assets/images/header/background.png";
import ContactButton from "@/components/Mobile/components/Header/components/ContactButton";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #181f2b;
  height: 80px;
  width: 100%;
  z-index: 10;

  ${media.sm} {
    height: 60px;
  }
`;

const HeaderBackground = styled.div`
  display: none;

  ${media.sm} {
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    & > img {
      height: 100%;
      object-fit: cover;
    }
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;
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
  align-items: center;
  justify-content: end;
`;

type Props = {};
const Header = (props: Props) => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;

  return (
    <HeaderContainer>
      <HeaderBackground>
        <img src={HeaderBg} alt={"header"} />
      </HeaderBackground>
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

          <ContactButton />
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
