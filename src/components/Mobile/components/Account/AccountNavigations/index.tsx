import React, { useCallback, useEffect } from "react";
import BalanceTracker from "@/components/Mobile/components/BalanceTracker";
import LanguageSwitch from "@/components/Mobile/components/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import styled from "styled-components";
import NavCard from "@/components/Mobile/components/Account/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/Mobile/components/Account/AppDownloadButton";
import { useHistory } from "react-router-dom";
import {
  NavCardItem,
  NavCardKey,
  useAccountNavigations,
} from "@/hooks/account/useAccountNavigations";
import { useAuth } from "@/hooks/auth/useAuth";
import i18n from "@/utils/i18n";

const AccountNavsContainer = styled.div`
  padding: 15px 0 0;
  & > * {
    margin-bottom: 8px;
  }
  & > *:first-child {
    margin-bottom: 16px;
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
  const { navCardItemList } = useAccountNavigations();
  const { handleLogout } = useAuth();

  const handleClickNav = useCallback((navCardItem: NavCardItem) => {
    history.push(navCardItem.routePath);
  }, []);

  return (
    <>
      <AccountNavsContainer>
        <BalanceTracker />

        <AccountNavCardsContainer>
          {/* Cards */}
          {navCardItemList.map((navCardItem) => {
            if (navCardItem.key === NavCardKey.APP_DOWNLOAD) {
              return (
                <AppDownloadButton
                  key={navCardItem.key}
                  navCardItem={navCardItem}
                  handleClick={handleClickNav}
                />
              );
            }

            return (
              <NavCard
                key={navCardItem.key}
                navCardItem={navCardItem}
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
    </>
  );
};

export default React.memo(AccountNavigations);
