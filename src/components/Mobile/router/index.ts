import React from "react";
import config from "@/config/config";
import Main from "@/components/Mobile/pages/Main";
import Deposit from "@/components/Mobile/pages/Deposit";
import Withdraw from "@/components/Mobile/pages/Withdraw";
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

const Mine = React.lazy(() => import("@/components/Mobile/pages/Account/Mine"));

interface Route {
  path: string;
  component: any;
  alert?: boolean;
  popup?: boolean;
  navigate?: boolean;
  promoProps?: boolean;
  screenHeight?: boolean;
  GetSupportUrl?: boolean;
  brandComm?: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    component: Main,
    alert: true,
    popup: true,
    navigate: true,
  },
  {
    path: "/main",
    component: Main,
    alert: true,
    popup: true,
    navigate: true,
  },
  {
    path: "/main/:page",
    component: Main,
    alert: true,
    popup: true,
    navigate: true,
  },
  {
    path: "/account",
    component: Mine,
    alert: true,
  },
  {
    path: "/deposit",
    component: Deposit,
    alert: true,
  },
  {
    path: "/withdrawal",
    component: Withdraw,
    alert: true,
  },
  {
    path: "/betting-bonus",
    component: BettingBonus,
    navigate: true,
  },
  {
    path: "/login",
    component: Login,
    alert: true,
  },
  {
    path: "/register",
    component: Register,
    alert: true,
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
    alert: true,
  },
  {
    path: "/profile/name",
    component: ProfileName,
    alert: true,
  },
  {
    path: "/profile/wechat",
    component: ProfileWeChat,
    alert: true,
  },
  {
    path: "/profile/birthdate",
    component: ProfileBirthDate,
    alert: true,
  },
  {
    path: "/profile/qq",
    component: ProfileQQ,
    alert: true,
  },
  {
    path: "/profile/fb",
    component: ProfileFacebookMessenger,
    alert: true,
  },
  {
    path: "/profile/telegram",
    component: ProfileTelegram,
    alert: true,
  },
  {
    path: "/profile/line",
    component: ProfileLine,
    alert: true,
  },
  {
    path: "/profile/viber",
    component: ProfileViber,
    alert: true,
  },
  {
    path: "/profile/whatsapp",
    component: ProfileWhatsapp,
    alert: true,
  },
  {
    path: "/profile/email",
    component: ProfileEmail,
    alert: true,
  },
  {
    path: "/profile/changeemail",
    component: ProfileChangeEmail,
    alert: true,
  },
  {
    path: "/profile/changephone",
    component: ProfileChangePhone,
    alert: true,
  },
  {
    path: "/profile/phone",
    component: ProfilePhone,
    alert: true,
  },
  {
    path: "/profile/changepassword",
    component: ProfileChangePassword,
    alert: true,
  },
  {
    path: "/profile/withdrawalpassword",
    component: ProfileWithdrawalPassword,
    alert: true,
  },
  {
    path: "/profile/resetwithdrawalpassword",
    component: ProfileResetWithdrawalPassword,
    alert: true,
  },
  {
    path: "/profile/changewithdrawalpassword",
    component: ProfileChangeWithdrawalPassword,
    alert: true,
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
    alert: true,
    navigate: true,
  },
  {
    path: "/promotion/:id?",
    component: PromotionDetail,
    alert: true,
    navigate: true,
    promoProps: true,
  },
  //
  {
    path: "/inbox",
    component: Inbox,
    alert: true,
    navigate: true,
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
  // {
  //   path: "/withdrawal/details",
  //   component: WithdrawalDetails,
  //   alert: true,
  //   navigate: true,
  // },
  //
  {
    path: "/deposit/:promotionid?",
    component: Deposit,
    alert: true,
    navigate: true,
  },
  // {
  //   path: "/manual/:paymentId?",
  //   component: Deposit,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/deposit/payment/:id/:bank/:amount/:bonus?",
  //   component: DepositPayment,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/deposit/details",
  //   component: DepositDetails,
  //   alert: true,
  // },
  // {
  //   path: "/deposit/manual",
  //   component: DepositManual,
  //   alert: true,
  // },
  {
    path: "/card",
    component: Card,
    alert: true,
    navigate: true,
  },
  {
    path: "/card/add",
    component: AddCard,
    alert: true,
    navigate: true,
  },
  {
    path: "/maintenance",
    component: MaintenancePage,
    navigate: true,
    alert: true,
    GetSupportUrl: true,
    brandComm: true,
  },
  // // {
  // //   path: "/card/name",
  // //   component: NameVerification,
  // //   alert: true,
  // //   navigate: true,
  // // },
  // // {
  // //   path: "/card/pass",
  // //   component: PassSetting,
  // //   alert: true,
  // //   navigate: true,
  // // },
  //
  {
    path: "/report/:tab?",
    component: Report,
    alert: true,
    navigate: true,
  },
  // // {
  // //   path: "/customer-service",
  // //   component: CustomerService,
  // //   alert: true,
  // //   navigate: true,
  // //   popup: true,
  // // },
  // {
  //   path: "/chat/:userid?/:name?/:question?",
  //   component: CustomerServiceChat,
  // },
  // {
  //   path: "/forgot-password",
  //   component: ForgotPassword,
  //   alert: true,
  // },
  // // {
  // //   path: "/forgot-password/option",
  // //   component: ForgotPasswordStep2,
  // //   alert: true,
  // // },
  // // {
  // //   path: "/forgot-password/reset",
  // //   component: ForgotPasswordReset,
  // //   alert: true,
  // // },
  //
  {
    path: "/affiliate",
    component: Affiliate,
    navigate: true,
  },
  // //{
  // //  path: "/affiliate/member",
  // //  component: AffiliateMember,
  // //  screenHeight: true,
  // //},
  // //{
  // //  path: "/affiliate/report",
  // //  component: AffiliateReport,
  // //  screenHeight: true,
  // //},
  // //{
  // //  path: "/affiliate/guide",
  // //  component: AffiliateGuide,
  // //  screenHeight: true,
  // //},
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
    navigate: true,
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
    navigate: true,
  },
];

if (!config.features.NewTransferUI) {
  routes.push({
    path: "/transfer",
    component: Transfer,
    alert: true,
    navigate: true,
  });
}

export { routes };
