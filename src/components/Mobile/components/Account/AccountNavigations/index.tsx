import React, { useCallback, useMemo } from "react";
import BalanceTracker from "@/components/Mobile/components/BalanceTracker";
import LanguageSwitch from "@/components/Mobile/components/LanguageSwitch";
import Button from "@/components/Mobile/components/UI/Button";
import styled from "styled-components";
import NavCard, {
  NavCardItem,
} from "@/components/Mobile/components/Account/AccountNavigations/NavCard";
import profileImg from "@/assets/images/account/icon_profile.svg";
import depositImg from "@/assets/images/account/icon_deposit.svg";
import withdrawImg from "@/assets/images/account/icon_withdraw.svg";
import transferImg from "@/assets/images/account/icon_transfer.svg";
import reportImg from "@/assets/images/account/icon_report.svg";
import inboxImg from "@/assets/images/account/icon_inbox.svg";
import affiliateImg from "@/assets/images/account/icon_affiliate.svg";
import AppDownloadButton from "@/components/Mobile/components/Account/AppDownloadButton";
import { useDialogOpenState } from "@/components/Mobile/hooks/account/useDialogOpenState";
import AccountDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog";

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
  const navCardItemList: NavCardItem[] = useMemo(() => {
    return [
      {
        key: "profile",
        label: "Account",
        iconUrl: profileImg,
      },
      {
        key: "deposit",
        label: "Deposit",
        iconUrl: depositImg,
      },
      {
        key: "withdraw",
        label: "Withdraw",
        iconUrl: withdrawImg,
      },
      {
        key: "transfer",
        label: "Transfer",
        iconUrl: transferImg,
      },
      {
        key: "report",
        label: "Report",
        iconUrl: reportImg,
      },
      {
        key: "inbox",
        label: "Inbox",
        iconUrl: inboxImg,
      },
      {
        key: "affiliate",
        label: "Affiliate",
        iconUrl: affiliateImg,
      },
      {
        key: "contactUs",
        label: "Contact Us",
        iconUrl: profileImg,
      },
    ];
  }, []);

  const navCardDictionary = useMemo(() => {
    const dictionary: { [key in string]: NavCardItem } = {};
    navCardItemList.forEach((navCardItem) => {
      dictionary[navCardItem.key] = navCardItem;
    });

    return dictionary;
  }, []);

  const { dialogOpenState, handleToggleDialog } =
    useDialogOpenState<NavCardItem>(navCardDictionary);

  const handleClickNav = useCallback((navCardItem: NavCardItem) => {
    handleToggleDialog(navCardItem.key);
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
        handleCloseDialog={handleToggleDialog}
      />
    </>
  );
};

export default AccountNavigations;
