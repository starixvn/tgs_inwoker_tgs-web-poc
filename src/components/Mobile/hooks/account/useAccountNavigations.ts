import { NavCardItem } from "@/components/Mobile/components/Account/AccountNavigations/NavCard";
import { useMemo } from "react";
import profileImg from "@/assets/images/account/icon_profile.svg";
import depositImg from "@/assets/images/account/icon_deposit.svg";
import withdrawImg from "@/assets/images/account/icon_withdraw.svg";
import transferImg from "@/assets/images/account/icon_transfer.svg";
import reportImg from "@/assets/images/account/icon_report.svg";
import inboxImg from "@/assets/images/account/icon_inbox.svg";
import affiliateImg from "@/assets/images/account/icon_affiliate.svg";

export function useAccountNavigations() {
  const navCardItemList: NavCardItem[] = useMemo(() => {
    return [
      {
        key: "profile",
        label: "Account",
        iconUrl: profileImg,
        routePath: "/account?profile",
        isOpenInDialog: true,
      },
      {
        key: "deposit",
        label: "Deposit",
        iconUrl: depositImg,
        routePath: "/account/deposit",
      },
      {
        key: "withdraw",
        label: "Withdraw",
        iconUrl: withdrawImg,
        routePath: "/account/withdraw",
      },
      {
        key: "transfer",
        label: "Transfer",
        iconUrl: transferImg,
        routePath: "/account?transfer",
        isOpenInDialog: true,
      },
      {
        key: "report",
        label: "Report",
        iconUrl: reportImg,
        routePath: "/account?report",
        isOpenInDialog: true,
      },
      {
        key: "inbox",
        label: "Inbox",
        iconUrl: inboxImg,
        routePath: "/account?inbox",
        isOpenInDialog: true,
      },
      {
        key: "affiliate",
        label: "Affiliate",
        iconUrl: affiliateImg,
        routePath: "/account?affiliate",
        isOpenInDialog: true,
      },
      {
        key: "contactUs",
        label: "Contact Us",
        iconUrl: profileImg,
        routePath: "/account?contact",
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
