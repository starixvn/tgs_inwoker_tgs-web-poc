import Card from "@/pages/Card";
import AddCard from "@/pages/Card/AddCard";
import Affiliate from "@/pages/Affiliate";
import BettingBonus from "@/pages/BettingBonus";
import ContactUsPage from "@/pages/ContactUs";
import DepositPage from "@/pages/Deposit";
import DepositDetails from "@/pages/Deposit/DepositDetails";
import DepositManual from "@/pages/Deposit/DepositManual";
import DepositPayment from "@/pages/Deposit/DepositPayment";
import Inbox from "@/pages/Inbox";
import LoginPage from "@/pages/Login";
import Main from "@/pages/Main";
import Maintenance from "@/pages/Maintenance";
import ProfilePage from "@/pages/Profile";
import ProfileBirthDatePage from "@/components/Account/Profile/ProfileBirthDate";
import ProfileChangeEmail from "@/components/Account/Profile/ProfileChangeEmail";
import ProfileChangePasswordPage from "@/components/Account/Profile/ProfileChangePassword";
import ProfileChangePhonePage from "@/components/Account/Profile/ProfileChangePhone";
import ProfileChangeWithdrawalPasswordPage from "@/components/Account/Profile/ProfileChangeWithdrawalPassword";
import ProfileEmailPage from "@/components/Account/Profile/ProfileEmail";
import ProfileFacebookMessengerPage from "@/components/Account/Profile/ProfileFacebookMessenger";
import ProfileLinePage from "@/components/Account/Profile/ProfileLine";
import ProfileNamePage from "@/components/Account/Profile/ProfileName";
import ProfilePhonePage from "@/components/Account/Profile/ProfilePhone";
import ProfileQQPage from "@/components/Account/Profile/ProfileQQ";
import ProfileResetWithdrawalPasswordPage from "@/components/Account/Profile/ProfileResetWithdrawalPassword";
import ProfileTelegramPage from "@/components/Account/Profile/ProfileTelegram";
import ProfileViberPage from "@/components/Account/Profile/ProfileViber";
import ProfileWithdrawalPasswordPage from "@/components/Account/Profile/ProfileWIthdrawalPassword";
import ProfileWeChatPage from "@/components/Account/Profile/ProfileWeChat";
import ProfileWhatsappPage from "@/components/Account/Profile/ProfileWhatsapp";
import Promotion from "@/pages/Promotion";
import RegisterPage from "@/pages/Register";
import Report from "@/pages/Report";
import Transfer from "@/pages/Transfer";
import VIP from "@/pages/Vip";
import Withdrawal from "@/pages/Withdrawal";
import WithdrawalDetails from "@/pages/Withdrawal/WithdrawalDetails";
import config from "@/config/config";
import React from "react";
import PromotionDetail from "@/pages/Promotion/PromotionDetail";
import DefaultLayout from "@/layouts/DefaultLayout";
import ForgotPasswordPage from "@/pages/ForgetPassword";
import DialogLayout from "@/layouts/DialogLayout";
import { ProfilePathEnum } from "@/components/Account/Profile/profilePageDictionary";
import AuthDialogLayout from "@/layouts/AuthDialogLayout";

const Mine = React.lazy(() => import("@/pages/Account/Mine"));

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
    component: DepositPage,
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
    component: LoginPage,
    category: RouteCategoryEnum.MINE,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    category: RouteCategoryEnum.MINE,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  // TODO:these 4 params looks like is unused?
  {
    path: "/a/:promotionid",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/t/:promotionid",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },

  {
    path: "/f/:promotionid",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/p/:playername",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: ProfilePathEnum.PROFILE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.NAME,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WECHAT,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.BIRTHDATE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.QQ,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.FB,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.TELEGRAM,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.LINE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.VIBER,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WHATSAPP,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.EMAIL,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_EMAIL,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_PHONE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.PHONE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WIDHDRAWAL_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.RESET_WITHDRAWAL_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_WITHDRAWAL_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
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
    layout: DialogLayout,
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
  // TODO:it looks like /withdrawal/details is not used?
  {
    path: "/withdrawal/details",
    component: WithdrawalDetails,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/deposit/:promotionid?",
    component: DepositPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/manual/:paymentId?",
    component: DepositPage,
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
    layout: DialogLayout,
  },

  // {
  //   path: "/chat/:userid?/:name?/:question?",
  //   component: CustomerServiceChat,
  // },

  {
    path: "/affiliate",
    component: Affiliate,
    category: RouteCategoryEnum.REFER,
    layout: DialogLayout,
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
    component: ContactUsPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
];

if (!config.features.NewTransferUI) {
  routes.push({
    path: "/transfer",
    component: Transfer,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  });
}

export { routes };
