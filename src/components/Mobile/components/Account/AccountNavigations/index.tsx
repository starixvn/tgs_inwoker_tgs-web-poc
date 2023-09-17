import React, { CSSProperties, useCallback } from "react";
import styled from "styled-components";
import NavCard, {
  NavCardItem,
} from "@/components/Mobile/components/Account/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/Mobile/components/Account/AppDownloadButton";
import accountImg from "@/assets/images/account/icon_account.svg";
import depositImg from "@/assets/images/account/icon_deposit.svg";
import withdrawImg from "@/assets/images/account/icon_withdraw.svg";
import transferImg from "@/assets/images/account/icon_transfer.svg";
import reportImg from "@/assets/images/account/icon_report.svg";
import inboxImg from "@/assets/images/account/icon_inbox.svg";
import affiliateImg from "@/assets/images/account/icon_affiliate.svg";

const AccountNavigationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const navCardItemList: NavCardItem[] = [
  {
    key: "account",
    label: "Account",
    iconUrl: accountImg,
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
    iconUrl: accountImg,
  },
];

const AccountNavigations = () => {
  const handleClickNav = useCallback((navCardItem: NavCardItem) => {}, []);

  return (
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
  );
};

export default React.memo(AccountNavigations);
