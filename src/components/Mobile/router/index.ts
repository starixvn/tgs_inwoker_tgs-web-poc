import Card from "@/components/Mobile/components/Card";
import AddCard from "@/components/Mobile/components/Card/AddCard";
import Affiliate from "@/components/Mobile/pages/Affiliate";
import BettingBonus from "@/components/Mobile/pages/BettingBonus";
import ContactUsPage from "@/components/Mobile/pages/ContactUs";
import Deposit from "@/components/Mobile/pages/Deposit";
import DepositDetails from "@/components/Mobile/pages/Deposit/DepositDetails";
import DepositManual from "@/components/Mobile/pages/Deposit/DepositManual";
import DepositPayment from "@/components/Mobile/pages/Deposit/DepositPayment";
import Inbox from "@/components/Mobile/pages/Inbox";
import LoginPage from "@/components/Mobile/pages/Login";
import Main from "@/components/Mobile/pages/Main";
import Maintenance from "@/components/Mobile/pages/Maintenance";
import Profile from "@/components/Mobile/pages/Profile";
import ProfileBirthDatePage from "@/components/Mobile/pages/Profile/ProfileBirthDate";
import ProfileChangeEmail from "@/components/Mobile/pages/Profile/ProfileChangeEmail";
import ProfileChangePasswordPage from "@/components/Mobile/pages/Profile/ProfileChangePassword";
import ProfileChangePhonePage from "@/components/Mobile/pages/Profile/ProfileChangePhone";
import ProfileChangeWithdrawalPasswordPage from "@/components/Mobile/pages/Profile/ProfileChangeWithdrawalPassword";
import ProfileEmailPage from "@/components/Mobile/pages/Profile/ProfileEmail";
import ProfileFacebookMessengerPage from "@/components/Mobile/pages/Profile/ProfileFacebookMessenger";
import ProfileLinePage from "@/components/Mobile/pages/Profile/ProfileLine";
import ProfileNamePage from "@/components/Mobile/pages/Profile/ProfileName";
import ProfilePhonePage from "@/components/Mobile/pages/Profile/ProfilePhone";
import ProfileQQPage from "@/components/Mobile/pages/Profile/ProfileQQ";
import ProfileResetWithdrawalPasswordPage from "@/components/Mobile/pages/Profile/ProfileResetWithdrawalPassword";
import ProfileTelegramPage from "@/components/Mobile/pages/Profile/ProfileTelegram";
import ProfileViberPage from "@/components/Mobile/pages/Profile/ProfileViber";
import ProfileWithdrawalPasswordPage from "@/components/Mobile/pages/Profile/ProfileWIthdrawalPassword";
import ProfileWeChatPage from "@/components/Mobile/pages/Profile/ProfileWeChat";
import ProfileWhatsappPage from "@/components/Mobile/pages/Profile/ProfileWhatsapp";
import Promotion from "@/components/Mobile/pages/Promotion";
import RegisterPage from "@/components/Mobile/pages/Register";
import Report from "@/components/Mobile/pages/Report";
import Transfer from "@/components/Mobile/pages/Transfer";
import VIP from "@/components/Mobile/pages/Vip/index";
import Withdrawal from "@/components/Mobile/pages/Withdrawal";
import WithdrawalDetails from "@/components/Mobile/pages/Withdrawal/WithdrawalDetails";
import config from "@/config/config";
import React from "react";
import PromotionDetail from "../pages/Promotion/PromotionDetail";
import DefaultLayout from "@/components/Mobile/layouts/DefaultLayout";
import ForgotPasswordPage from "@/components/Mobile/pages/ForgetPassword";
import DialogLayout from "@/components/Mobile/layouts/DialogLayout";

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
    component: LoginPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
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
    path: "/profile",
    component: Profile,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/profile/name",
    component: ProfileNamePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/wechat",
    component: ProfileWeChatPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/birthdate",
    component: ProfileBirthDatePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/qq",
    component: ProfileQQPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/fb",
    component: ProfileFacebookMessengerPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/telegram",
    component: ProfileTelegramPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/line",
    component: ProfileLinePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/viber",
    component: ProfileViberPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/whatsapp",
    component: ProfileWhatsappPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/email",
    component: ProfileEmailPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/changeemail",
    component: ProfileChangeEmail,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/changephone",
    component: ProfileChangePhonePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/phone",
    component: ProfilePhonePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/changepassword",
    component: ProfileChangePasswordPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/withdrawalpassword",
    component: ProfileWithdrawalPasswordPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/resetwithdrawalpassword",
    component: ProfileResetWithdrawalPasswordPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/profile/changewithdrawalpassword",
    component: ProfileChangeWithdrawalPasswordPage,
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
