import React, { useCallback, useEffect } from "react";
import BalanceTracker from "@/components/Mobile/components/BalanceTracker";
import LanguageSwitch from "@/components/Mobile/components/LanguageSwitch";
import Button from "@/components/Mobile/components/UI/Button";
import styled from "styled-components";
import NavCard from "@/components/Mobile/components/Account/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/Mobile/components/Account/AppDownloadButton";
import { useDialogOpenState } from "@/components/Mobile/hooks/account/useDialogOpenState";
import { useHistory } from "react-router-dom";
import {
  NavCardItem,
  NavCardKey,
  NavDialogFactory,
  useAccountNavigations,
} from "@/components/Mobile/hooks/account/useAccountNavigations";

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
  const { navCardItemList, navCardDictionary, openInDialogDictionary } =
    useAccountNavigations();

  const { dialogOpenState, handleToggleDialog } =
    useDialogOpenState<NavCardItem>(navCardDictionary);

  const handleClickNav = useCallback((navCardItem: NavCardItem) => {
    if (openInDialogDictionary[navCardItem.key]) {
      handleToggleDialog(navCardItem.key);
      history.push(navCardItem.routePath);
      return;
    }
    history.push(navCardItem.routePath);
  }, []);

  const handleCloseNav = useCallback(() => {
    handleToggleDialog();
    history.push("/account");
  }, []);

  useEffect(() => {
    // open correspond dialog via url
    const { pathname, search } = history.location;
    const matchedNavCardItem = navCardItemList.find((navCardItem) => {
      return navCardItem.routePath === `${pathname}${search}`;
    });

    if (!matchedNavCardItem) return;
    handleClickNav(matchedNavCardItem);
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
        <Button fullWidth variant={"contained"} color={"primary"}>
          Logout
        </Button>
      </AccountNavsContainer>

      {/* Dialogs */}
      {navCardItemList.map((navCardItem) => {
        if (!navCardItem.isOpenInDialog) return null;

        const NavDialogComponent = NavDialogFactory[navCardItem.key];
        return (
          <NavDialogComponent
            key={navCardItem.key}
            isOpen={dialogOpenState[navCardItem.key]}
            handleCloseDialog={handleCloseNav}
          />
        );
      })}
    </>
  );
};

export default React.memo(AccountNavigations);
