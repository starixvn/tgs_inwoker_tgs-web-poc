import config from "../../../config/config";
import Main from "@/components/Mobile/pages/Main";
import Mine from "@/components/Mobile/components/Mine";

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
  // {
  //   path: "/login",
  //   component: LoginDialog,
  //   alert: true,
  // },
  // {
  //   path: "/register",
  //   // path: "/register&visitor_id=:subid",
  //   component: RegisterDialog,
  //   alert: true,
  // },
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

  // {
  //   path: "/profile",
  //   component: Profile,
  //   alert: true,
  // },
  // {
  //   path: "/profile/name",
  //   component: NameVerify,
  //   alert: true,
  // },
  // {
  //   path: "/profile/wechat",
  //   component: WeChat,
  //   alert: true,
  // },
  // {
  //   path: "/profile/birthdate",
  //   component: Birthdate,
  //   alert: true,
  // },
  // {
  //   path: "/profile/qq",
  //   component: QQ,
  //   alert: true,
  // },
  // {
  //   path: "/profile/fb",
  //   component: FacebookMessenger,
  //   alert: true,
  // },
  // {
  //   path: "/profile/telegram",
  //   component: Telegram,
  //   alert: true,
  // },
  // {
  //   path: "/profile/line",
  //   component: Line,
  //   alert: true,
  // },
  // {
  //   path: "/profile/viber",
  //   component: Viber,
  //   alert: true,
  // },
  // {
  //   path: "/profile/whatsapp",
  //   component: Whatsapp,
  //   alert: true,
  // },
  // {
  //   path: "/profile/email",
  //   component: Email,
  //   alert: true,
  // },
  // {
  //   path: "/profile/changeemail",
  //   component: ChangeEmail,
  //   alert: true,
  // },
  // {
  //   path: "/profile/changephone",
  //   component: ChangePhone,
  //   alert: true,
  // },
  // {
  //   path: "/profile/phone",
  //   component: Phone,
  //   alert: true,
  // },
  // {
  //   path: "/profile/changepassword",
  //   component: ChangePassword,
  //   alert: true,
  // },
  // {
  //   path: "/profile/withdrawalpassword",
  //   component: WithdrawalPassword,
  //   alert: true,
  // },
  // {
  //   path: "/profile/resetwithdrawalpassword",
  //   component: ResetWithdrawalPassword,
  //   alert: true,
  // },
  // {
  //   path: "/profile/changewithdrawalpassword",
  //   component: ChangeWithdrawalPassword,
  //   alert: true,
  // },
  //
  // {
  //   path: "/slots/:platform?/:type?",
  //   component: Slot,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/promotion-list",
  //   component: Promotion,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/promotion/:id?",
  //   component: PromotionDetails,
  //   alert: true,
  //   navigate: true,
  //   promoProps: true,
  // },
  //
  // {
  //   path: "/inbox",
  //   component: Inbox,
  //   alert: true,
  //   navigate: true,
  // },
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
  //   path: "/withdrawal",
  //   component: Withdrawal,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/withdrawal/details",
  //   component: WithdrawalDetails,
  //   alert: true,
  //   navigate: true,
  // },
  //
  // {
  //   path: "/deposit/:promotionid?",
  //   component: Deposit,
  //   alert: true,
  //   navigate: true,
  // },
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
  // {
  //   path: "/card",
  //   component: Card,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/card/add",
  //   component: AddCard,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/maintenance",
  //   component: Maintenance,
  //   navigate: true,
  //   alert: true,
  //   GetSupportUrl: true,
  //   brandComm: true,
  // },
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
  // {
  //   path: "/report/:tab?",
  //   component: Report,
  //   alert: true,
  //   navigate: true,
  // },
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
  // {
  //   path: "/affiliate",
  //   component: Affiliate,
  //   navigate: true,
  // },
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
  // {
  //   path: "/vip",
  //   component: VIP,
  //   navigate: true,
  // },
  // {
  //   path: "/sports/:platform",
  //   component: CustomSportPage,
  //   alert: true,
  //   navigate: true,
  // },
];

if (!config.features.NewTransferUI) {
  // routes.push({
  //   path: "/transfer",
  //   component: Transfer,
  //   alert: true,
  //   navigate: true,
  // });
}

export { routes };
