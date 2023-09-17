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
    label: "Account",
    iconUrl: accountImg,
  },
  {
    label: "Deposit",
    iconUrl: depositImg,
  },
  {
    label: "Withdraw",
    iconUrl: withdrawImg,
  },
  {
    label: "Transfer",
    iconUrl: transferImg,
  },
  {
    label: "Report",
    iconUrl: reportImg,
  },
  {
    label: "Inbox",
    iconUrl: inboxImg,
  },
  {
    label: "Affiliate",
    iconUrl: affiliateImg,
  },
  {
    label: "Contact Us",
    iconUrl: accountImg,
  },
];

const AccountNavigations = (props: any) => {
  const handleClickNav = useCallback((navCardItem: NavCardItem) => {}, []);

  return (
    <AccountNavigationsContainer {...props}>
      {navCardItemList.map((navCardItem, index) => {
        return (
          <NavCard
            key={index}
            navCardItem={navCardItem}
            handleClick={handleClickNav}
          />
        );
      })}

      <AppDownloadButton />
    </AccountNavigationsContainer>
  );
};

export default AccountNavigations;
