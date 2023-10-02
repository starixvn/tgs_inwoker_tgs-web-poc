import React, { NamedExoticComponent, Props, useMemo } from "react";
import profileImg from "@/assets/images/account/icon_profile.svg";
import depositImg from "@/assets/images/account/icon_deposit.svg";
import withdrawImg from "@/assets/images/account/icon_withdraw.svg";
import transferImg from "@/assets/images/account/icon_transfer.svg";
import reportImg from "@/assets/images/account/icon_report.svg";
import inboxImg from "@/assets/images/account/icon_inbox.svg";
import affiliateImg from "@/assets/images/account/icon_affiliate.svg";
import downloadImg from "@/assets/images/account/icon_download.png";
import AccountDialog from "@/components/Mobile/pages/Profile/ProfileMenuDialog";
import TransferDialog from "@/components/Mobile/pages/Transfer/TransferDialog";
import ReportDialog from "@/components/Mobile/pages/Report/ReportDialog";
import InboxDialog from "@/components/Mobile/pages/Inbox/InboxDialog";
import AffiliateDialog from "@/components/Mobile/pages/Affiliate/AffiliateDialog";
import ContactUsDialog from "@/components/Mobile/pages/ContactUs/ContactUsDialog";
import DownloadAppDialog from "@/components/Mobile/pages/AppDownload/DownloadAppDialog";

export enum NavCardKey {
  PROFILE,
  DEPOSIT,
  WITHDRAW,
  TRANSFER,
  REPORT,
  INBOX,
  AFFILIATE,
  CONTACT_US,
  APP_DOWNLOAD,
}

export interface NavCardItem {
  key: NavCardKey;
  label: string;
  iconUrl: string;
  routePath: string;
}

export function useAccountNavigations() {
  const navCardItemList: NavCardItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        label: "Account",
        iconUrl: profileImg,
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: "Deposit",
        iconUrl: depositImg,
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: "Withdraw",
        iconUrl: withdrawImg,
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        label: "Transfer",
        iconUrl: transferImg,
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: "Report",
        iconUrl: reportImg,
        routePath: "/report",
      },
      {
        key: NavCardKey.INBOX,
        label: "Inbox",
        iconUrl: inboxImg,
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: "Affiliate",
        iconUrl: affiliateImg,
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: "Contact Us",
        iconUrl: profileImg,
        routePath: "/contact",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: "App Download",
        iconUrl: downloadImg,
        routePath: "/appDownload",
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

  return {
    navCardItemList,
    navCardDictionary,
  };
}
