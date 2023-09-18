import React, { useCallback, useEffect, useMemo } from "react";
import BalanceTracker from "@/components/Mobile/components/BalanceTracker";
import LanguageSwitch from "@/components/Mobile/components/LanguageSwitch";
import Button from "@/components/Mobile/components/UI/Button";
import styled from "styled-components";
import NavCard, {
  NavCardItem,
} from "@/components/Mobile/components/Account/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/Mobile/components/Account/AppDownloadButton";
import { useDialogOpenState } from "@/components/Mobile/hooks/account/useDialogOpenState";
import AccountDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog";
import { useHistory } from "react-router-dom";
import { useAccountNavigations } from "@/components/Mobile/hooks/account/useAccountNavigations";

const AccountNavsContainer = styled.div`
  padding: 15px 0 0;
  & > * {
    margin-bottom: 8px;
  }
  & > *:first-child {
    margin-bottom: 16px;
  }
`;

const AccountNavigationsContainer = styled.div`
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
        <AccountNavigationsContainer>
          {navCardItemList.map((navCardItem) => {
            return (
              <NavCard
                key={navCardItem.key}
                navCardItem={navCardItem}
                handleClick={handleClickNav}
              />
            );
          })}

          <AppDownloadButton />
        </AccountNavigationsContainer>
        <LanguageSwitch />
        <Button fullWidth>Logout</Button>
      </AccountNavsContainer>

      {/* Dialogs */}
      <AccountDialog
        isOpen={dialogOpenState["profile"]}
        handleCloseDialog={handleCloseNav}
      />
    </>
  );
};

export default React.memo(AccountNavigations);
