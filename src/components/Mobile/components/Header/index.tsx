import React from "react";
import styled from "styled-components";
import MenuButton from "@/components/Mobile/components/Header/MenuButton";
import { useHistory } from "react-router";
import { useAccount } from "@/components/Mobile/hooks/useAccount";
import AnonymousHeaderContent from "@/components/Mobile/components/Header/AnonymousHeaderContent";
import AccountHeaderContent from "@/components/Mobile/components/Header/AccountHeaderContent";

const HeaderContainer = styled.div`
  background: #181f2b;
  height: 80px;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type Props = {};
const Header = (props: Props) => {
  const history = useHistory();

  const { account } = useAccount();

  const noLoginAccount = account.token !== account.info.token;

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuButton />

        <h3>Logo</h3>

        {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
