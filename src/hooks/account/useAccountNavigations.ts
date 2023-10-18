import React, { NamedExoticComponent, Props, useMemo } from "react";
import profileImg from "@/assets/images/account/icon_profile.svg";
import depositImg from "@/assets/images/account/icon_deposit.svg";
import withdrawImg from "@/assets/images/account/icon_withdraw.svg";
import transferImg from "@/assets/images/account/icon_transfer.svg";
import reportImg from "@/assets/images/account/icon_report.svg";
import inboxImg from "@/assets/images/account/icon_inbox.svg";
import affiliateImg from "@/assets/images/account/icon_affiliate.svg";
import downloadImg from "@/assets/images/account/icon_download.png";
import AccountDialog from "@/components/Account/Profile/ProfileMenu";
import TransferDialog from "@/pages/Transfer/TransferDialog";
import ReportDialog from "@/pages/Report/ReportDialog";
import InboxDialog from "@/pages/Inbox/InboxDialog";
import AffiliateDialog from "@/pages/Affiliate/AffiliateDialog";
import ContactUsDialog from "@/pages/ContactUs/ContactUsDialog";
import DownloadAppDialog from "@/pages/AppDownload/DownloadAppDialog";
import i18n from "@/utils/i18n";

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
        label: i18n.t("wap.main.my"),
        iconUrl: profileImg,
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositImg,
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawImg,
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        routePath: "/report",
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateImg,
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: profileImg,
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
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
