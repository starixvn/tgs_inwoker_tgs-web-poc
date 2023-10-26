import React, { useCallback, useEffect } from "react";
import BalanceTracker from "@/components/BalanceTracker";
import LanguageSwitch from "@/components/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import styled from "styled-components";
import NavCard from "@/components/Account/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/Account/AppDownloadButton";
import { useHistory } from "react-router-dom";
import {
  NavItem,
  NavCardKey,
  useAccountNavigations,
} from "@/hooks/account/useAccountNavigations";
import { useAuth } from "@/hooks/auth/useAuth";
import i18n from "@/utils/i18n";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";

const AccountNavsContainer = styled.div`
  & > div {
    margin-bottom: 15px;
  }

  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

type Props = {};
const AccountNavigations = (props: Props) => {
  const history = useHistory();
  const { navItemList } = useAccountNavigations();
  const { handleLogout, logoutState } = useAuth();

  const handleClickNav = useCallback((navItem: NavItem) => {
    history.push(navItem.routePath);
  }, []);

  return (
    <>
      <AccountNavsContainer>
        <BalanceTracker />

        <AccountNavCardsContainer>
          {/* Cards */}
          {navItemList.map((navItem) => {
            if (navItem.key === NavCardKey.APP_DOWNLOAD) {
              return (
                <AppDownloadButton
                  key={navItem.key}
                  navItem={navItem}
                  handleClick={handleClickNav}
                />
              );
            }

            return (
              <NavCard
                key={navItem.key}
                navItem={navItem}
                handleClick={handleClickNav}
              />
            );
          })}
        </AccountNavCardsContainer>

        <LanguageSwitch />

        <Button
          fullWidth
          variant={"contained"}
          color={"primary"}
          onClick={handleLogout}
        >
          {i18n.t("web.header.logout")}
        </Button>
      </AccountNavsContainer>

      {/*<Loading show={logoutState.isLoading} />*/}
    </>
  );
};

export default React.memo(AccountNavigations);
