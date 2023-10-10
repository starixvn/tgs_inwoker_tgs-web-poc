import Card from "@/components/Mobile/components/Card";
import AddCard from "@/components/Mobile/components/Card/AddCard";
import Affiliate from "@/components/Mobile/pages/Affiliate";
import BettingBonus from "@/components/Mobile/pages/BettingBonus";
import ContactUs from "@/components/Mobile/pages/ContactUs";
import Deposit from "@/components/Mobile/pages/Deposit";
import DepositDetails from "@/components/Mobile/pages/Deposit/DepositDetails";
import DepositManual from "@/components/Mobile/pages/Deposit/DepositManual";
import DepositPayment from "@/components/Mobile/pages/Deposit/DepositPayment";
import Inbox from "@/components/Mobile/pages/Inbox";
import Login from "@/components/Mobile/pages/Login";
import Main from "@/components/Mobile/pages/Main";
import Maintenance from "@/components/Mobile/pages/Maintenance";
import Profile from "@/components/Mobile/pages/Profile";
import ProfileBirthDate from "@/components/Mobile/pages/Profile/ProfileBirthDate";
import ProfileChangeEmail from "@/components/Mobile/pages/Profile/ProfileChangeEmail";
import ProfileChangePassword from "@/components/Mobile/pages/Profile/ProfileChangePassword";
import ProfileChangePhone from "@/components/Mobile/pages/Profile/ProfileChangePhone";
import ProfileChangeWithdrawalPassword from "@/components/Mobile/pages/Profile/ProfileChangeWithdrawalPassword";
import ProfileEmail from "@/components/Mobile/pages/Profile/ProfileEmail";
import ProfileFacebookMessenger from "@/components/Mobile/pages/Profile/ProfileFacebookMessenger";
import ProfileLine from "@/components/Mobile/pages/Profile/ProfileLine";
import ProfileName from "@/components/Mobile/pages/Profile/ProfileName";
import ProfilePhone from "@/components/Mobile/pages/Profile/ProfilePhone";
import ProfileQQ from "@/components/Mobile/pages/Profile/ProfileQQ";
import ProfileResetWithdrawalPassword from "@/components/Mobile/pages/Profile/ProfileResetWithdrawalPassword";
import ProfileTelegram from "@/components/Mobile/pages/Profile/ProfileTelegram";
import ProfileViber from "@/components/Mobile/pages/Profile/ProfileViber";
import ProfileWithdrawalPassword from "@/components/Mobile/pages/Profile/ProfileWIthdrawalPassword";
import ProfileWeChat from "@/components/Mobile/pages/Profile/ProfileWeChat";
import ProfileWhatsapp from "@/components/Mobile/pages/Profile/ProfileWhatsapp";
import Promotion from "@/components/Mobile/pages/Promotion";
import Register from "@/components/Mobile/pages/Register";
import Report from "@/components/Mobile/pages/Report";
import Transfer from "@/components/Mobile/pages/Transfer";
import VIP from "@/components/Mobile/pages/Vip/index";
import Withdrawal from "@/components/Mobile/pages/Withdrawal";
import WithdrawalDetails from "@/components/Mobile/pages/Withdrawal/WithdrawalDetails";
import config from "@/config/config";
import React from "react";
import PromotionDetail from "../components/Promotion/PromotionDetail";
import DefaultLayout from "@/components/Mobile/layouts/DefaultLayout";

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
  layout?: ({ children }: any) => JSX.Element;
  isAnonymousAllowed?: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    component: Main,
    category: RouteCategoryEnum.HOME,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main",
    component: Main,
    category: RouteCategoryEnum.HOME,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main/:page",
    component: Main,
    category: RouteCategoryEnum.HOME,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/account",
    component: Mine,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/deposit",
    component: Deposit,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/withdrawal",
    component: Withdrawal,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/betting-bonus",
    component: BettingBonus,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    component: Login,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/register",
    component: Register,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
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
    layout: DefaultLayout,
  },
  {
    path: "/profile/name",
    component: ProfileName,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/wechat",
    component: ProfileWeChat,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/birthdate",
    component: ProfileBirthDate,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/qq",
    component: ProfileQQ,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/fb",
    component: ProfileFacebookMessenger,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/telegram",
    component: ProfileTelegram,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/line",
    component: ProfileLine,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/viber",
    component: ProfileViber,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/whatsapp",
    component: ProfileWhatsapp,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/email",
    component: ProfileEmail,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/changeemail",
    component: ProfileChangeEmail,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/changephone",
    component: ProfileChangePhone,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/phone",
    component: ProfilePhone,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/changepassword",
    component: ProfileChangePassword,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/withdrawalpassword",
    component: ProfileWithdrawalPassword,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/resetwithdrawalpassword",
    component: ProfileResetWithdrawalPassword,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/changewithdrawalpassword",
    component: ProfileChangeWithdrawalPassword,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
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
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/promotion/:id?",
    component: PromotionDetail,
    category: RouteCategoryEnum.PROMOTION,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  //
  {
    path: "/inbox",
    component: Inbox,
    category: RouteCategoryEnum.INBOX,
    layout: DefaultLayout,
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
    layout: DefaultLayout,
  },
  {
    path: "/deposit/:promotionid?",
    component: Deposit,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/manual/:paymentId?",
    component: Deposit,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/deposit/payment/:id/:bank/:amount/:bonus?",
    component: DepositPayment,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/deposit/details",
    component: DepositDetails,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/deposit/manual",
    component: DepositManual,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/card",
    component: Card,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/card/add",
    component: AddCard,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/maintenance",
    component: Maintenance,
    category: RouteCategoryEnum.HOME,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },

  {
    path: "/report/:tab?",
    component: Report,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
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
    layout: DefaultLayout,
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
    layout: DefaultLayout,
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
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
];

if (!config.features.NewTransferUI) {
  routes.push({
    path: "/transfer",
    component: Transfer,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  });
}

export { routes };
