import React from "react";
import config from "@/config/config";
import Main from "@/components/Mobile/pages/Main";
import Deposit from "@/components/Mobile/pages/Deposit";
import Withdrawal from "@/components/Mobile/pages/Withdrawal";
import Promotion from "@/components/Mobile/pages/Promotion";
import PromotionDetail from "@/components/Mobile/components/Promotion/PromotionDetail";
import VIP from "@/components/Mobile/pages/VIP";
import BettingBonus from "@/components/Mobile/pages/BettingBonus";
import Card from "@/components/Mobile/components/Card";
import AddCard from "@/components/Mobile/components/Card/AddCard";
import MaintenancePrev from "@/components/Share/Maintenance";
import MaintenancePage from "@/components/Mobile/pages/MaintenancePage";
import TransferDialog from "@/components/Mobile/pages/Transfer/TransferDialog";
import Transfer from "@/components/Mobile/pages/Transfer";
import Profile from "@/components/Mobile/pages/Profile";
import Report from "@/components/Mobile/pages/Report";
import Inbox from "@/components/Mobile/pages/Inbox";
import Affiliate from "@/components/Mobile/pages/Affiliate";
import ContactUs from "@/components/Mobile/pages/ContactUs";
import ProfileName from "@/components/Mobile/pages/Profile/ProfileName";
import ProfileWeChat from "@/components/Mobile/pages/Profile/ProfileWeChat";
import ProfileBirthDate from "@/components/Mobile/pages/Profile/ProfileBirthDate";
import ProfileQQ from "@/components/Mobile/pages/Profile/ProfileQQ";
import ProfileEmail from "@/components/Mobile/pages/Profile/ProfileEmail";
import ProfilePhone from "@/components/Mobile/pages/Profile/ProfilePhone";
import Login from "@/components/Mobile/pages/Login";
import Register from "@/components/Mobile/pages/Register";
import ProfileChangeEmail from "@/components/Mobile/pages/Profile/ProfileChangeEmail";
import ProfileChangePhone from "@/components/Mobile/pages/Profile/ProfileChangePhone";
import ProfileChangePassword from "@/components/Mobile/pages/Profile/ProfileChangePassword";
import ProfileWithdrawalPassword from "@/components/Mobile/pages/Profile/ProfileWIthdrawalPassword";
import ProfileResetWithdrawalPassword from "@/components/Mobile/pages/Profile/ProfileResetWithdrawalPassword";
import ProfileChangeWithdrawalPassword from "@/components/Mobile/pages/Profile/ProfileChangeWithdrawalPassword";
import ProfileFacebookMessenger from "@/components/Mobile/pages/Profile/ProfileFacebookMessenger";
import ProfileTelegram from "@/components/Mobile/pages/Profile/ProfileTelegram";
import ProfileLine from "@/components/Mobile/pages/Profile/ProfileLine";
import ProfileViber from "@/components/Mobile/pages/Profile/ProfileViber";
import ProfileWhatsapp from "@/components/Mobile/pages/Profile/ProfileWhatsapp";
import DepositPayment from "@/components/Mobile/pages/Deposit/DepositPayment";
import DepositDetails from "@/components/Mobile/pages/Deposit/DepositDetails";
import DepositManual from "@/components/Mobile/pages/Deposit/DepositManual";
import WithdrawalDetails from "@/components/Mobile/pages/Withdrawal/WithdrawalDetails";

const Mine = React.lazy(() => import("@/components/Mobile/pages/Account/Mine"));

export enum RouteCategoryEnum {
  HOME,
  REFER,
  PROMOTION,
  INBOX,
  MINE,
}
export interface Route {
  path: string;
  component: any;
  category: RouteCategoryEnum;
}

const routes: Route[] = [
  {
    path: "/",
    component: Main,
    category: RouteCategoryEnum.HOME,
  },
  {
    path: "/main",
    component: Main,
    category: RouteCategoryEnum.HOME,
  },
  {
    path: "/main/:page",
    component: Main,
    category: RouteCategoryEnum.HOME,
  },
  {
    path: "/account",
    component: Mine,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/deposit",
    component: Deposit,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/withdrawal",
    component: Withdrawal,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/betting-bonus",
    component: BettingBonus,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/login",
    component: Login,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/register",
    component: Register,
    category: RouteCategoryEnum.MINE,
  },
  // {
  //   path: "/a/:promotionid",
  //   component: Login,
  //   alert: true,
  // },
  // {
  //   path: "/t/:promotionid",
  //   component: Login,
  //   alert: true,
  // },
  //
  // {
  //   path: "/f/:promotionid",
  //   component: Login,
  //   alert: true,
  // },
  // {
  //   path: "/p/:playername",
  //   component: Login,
  //   alert: true,
  // },

  {
    path: "/profile",
    component: Profile,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/name",
    component: ProfileName,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/wechat",
    component: ProfileWeChat,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/birthdate",
    component: ProfileBirthDate,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/qq",
    component: ProfileQQ,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/fb",
    component: ProfileFacebookMessenger,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/telegram",
    component: ProfileTelegram,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/line",
    component: ProfileLine,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/viber",
    component: ProfileViber,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/whatsapp",
    component: ProfileWhatsapp,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/email",
    component: ProfileEmail,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/changeemail",
    component: ProfileChangeEmail,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/changephone",
    component: ProfileChangePhone,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/phone",
    component: ProfilePhone,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/changepassword",
    component: ProfileChangePassword,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/withdrawalpassword",
    component: ProfileWithdrawalPassword,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/resetwithdrawalpassword",
    component: ProfileResetWithdrawalPassword,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/profile/changewithdrawalpassword",
    component: ProfileChangeWithdrawalPassword,
    category: RouteCategoryEnum.MINE,
  },

  // {
  //   path: "/slots/:platform?/:type?",
  //   component: Slot,
  //   alert: true,
  //   navigate: true,
  // },
  {
    path: "/promotion-list",
    component: Promotion,
    category: RouteCategoryEnum.PROMOTION,
  },
  {
    path: "/promotion/:id?",
    component: PromotionDetail,
    category: RouteCategoryEnum.PROMOTION,
  },
  //
  {
    path: "/inbox",
    component: Inbox,
    category: RouteCategoryEnum.INBOX,
  },
  // {
  //   path: "/memo",
  //   component: memo,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/inbox/details/:id",
  //   component: InboxDetails,
  //   alert: true,
  //   navigate: true,
  //   screenHeight: true,
  // },
  //
  // it looks like /withdrawal/details is not used?
  {
    path: "/withdrawal/details",
    component: WithdrawalDetails,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/deposit/:promotionid?",
    component: Deposit,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/manual/:paymentId?",
    component: Deposit,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/deposit/payment/:id/:bank/:amount/:bonus?",
    component: DepositPayment,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/deposit/details",
    component: DepositDetails,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/deposit/manual",
    component: DepositManual,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/card",
    component: Card,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/card/add",
    component: AddCard,
    category: RouteCategoryEnum.MINE,
  },
  {
    path: "/maintenance",
    component: MaintenancePage,
    category: RouteCategoryEnum.HOME,
  },

  {
    path: "/report/:tab?",
    component: Report,
    category: RouteCategoryEnum.MINE,
  },

  // {
  //   path: "/chat/:userid?/:name?/:question?",
  //   component: CustomerServiceChat,
  // },
  // {
  //   path: "/forgot-password",
  //   component: ForgotPassword,
  //   alert: true,

  {
    path: "/affiliate",
    component: Affiliate,
    category: RouteCategoryEnum.MINE,
  },
  // {
  //   path: "/setting/language",
  //   component: SettingLanguage,
  //   screenHeight: true,
  // },
  // {
  //   path: "/banned",
  //   component: Banned,
  //   navigate: true,
  // },
  {
    path: "/vip",
    component: VIP,
    category: RouteCategoryEnum.MINE,
  },
  // {
  //   path: "/sports/:platform",
  //   component: CustomSportPage,
  //   alert: true,
  //   navigate: true,
  // },
  {
    path: "/support",
    component: ContactUs,
    category: RouteCategoryEnum.MINE,
  },
];

if (!config.features.NewTransferUI) {
  routes.push({
    path: "/transfer",
    component: Transfer,
    category: RouteCategoryEnum.MINE,
  });
}

export { routes };
