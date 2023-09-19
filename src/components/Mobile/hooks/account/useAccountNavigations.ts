import React, { useMemo } from "react";
import profileImg from "@/assets/images/account/icon_profile.svg";
import depositImg from "@/assets/images/account/icon_deposit.svg";
import withdrawImg from "@/assets/images/account/icon_withdraw.svg";
import transferImg from "@/assets/images/account/icon_transfer.svg";
import reportImg from "@/assets/images/account/icon_report.svg";
import inboxImg from "@/assets/images/account/icon_inbox.svg";
import affiliateImg from "@/assets/images/account/icon_affiliate.svg";
import downloadImg from "@/assets/images/account/icon_download.png";
import AccountDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog";
import TransferDialog from "@/components/Mobile/components/Account/AccountNavigations/TransferDialog";
import ReportDialog from "@/components/Mobile/components/Account/AccountNavigations/ReportDialog";
import InboxDialog from "@/components/Mobile/components/Account/AccountNavigations/InboxDialog";
import AffiliateDialog from "@/components/Mobile/components/Account/AccountNavigations/AffiliateDialog";
import ContactUsDialog from "@/components/Mobile/components/Account/AccountNavigations/ContactUsDialog";
import DownloadAppDialog from "@/components/Mobile/components/Account/AccountNavigations/DownloadAppDialog";

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
  isOpenInDialog?: boolean;
}

export function useAccountNavigations() {
  const navCardItemList: NavCardItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        label: "Account",
        iconUrl: profileImg,
        routePath: "/account?profile",
        isOpenInDialog: true,
      },
      {
        key: NavCardKey.DEPOSIT,
        label: "Deposit",
        iconUrl: depositImg,
        routePath: "/account/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: "Withdraw",
        iconUrl: withdrawImg,
        routePath: "/account/withdraw",
      },
      {
        key: NavCardKey.TRANSFER,
        label: "Transfer",
        iconUrl: transferImg,
        routePath: "/account?transfer",
        isOpenInDialog: true,
      },
      {
        key: NavCardKey.REPORT,
        label: "Report",
        iconUrl: reportImg,
        routePath: "/account?report",
        isOpenInDialog: true,
      },
      {
        key: NavCardKey.INBOX,
        label: "Inbox",
        iconUrl: inboxImg,
        routePath: "/account?inbox",
        isOpenInDialog: true,
      },
      {
        key: NavCardKey.AFFILIATE,
        label: "Affiliate",
        iconUrl: affiliateImg,
        routePath: "/account?affiliate",
        isOpenInDialog: true,
      },
      {
        key: NavCardKey.CONTACT_US,
        label: "Contact Us",
        iconUrl: profileImg,
        routePath: "/account?contact",
        isOpenInDialog: true,
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: "App Download",
        iconUrl: downloadImg,
        routePath: "/account?appDownload",
        isOpenInDialog: true,
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

  const openInDialogDictionary = useMemo(() => {
    const dictionary: { [key in string]: boolean } = {};
    for (const navCardItem of navCardItemList) {
      if (!navCardItem.isOpenInDialog) continue;

      dictionary[navCardItem.key] = true;
    }

    return dictionary;
  }, []);

  return {
    navCardItemList,
    navCardDictionary,
    openInDialogDictionary,
  };
}

export const NavDialogFactory = {
  [NavCardKey.PROFILE]: AccountDialog,
  [NavCardKey.TRANSFER]: TransferDialog,
  [NavCardKey.REPORT]: ReportDialog,
  [NavCardKey.INBOX]: InboxDialog,
  [NavCardKey.AFFILIATE]: AffiliateDialog,
  [NavCardKey.CONTACT_US]: ContactUsDialog,
  [NavCardKey.APP_DOWNLOAD]: DownloadAppDialog,
};
