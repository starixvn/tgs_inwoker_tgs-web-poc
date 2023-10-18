import React, { NamedExoticComponent } from "react";
import ProfileMenuDesktop from "@/pages/Profile/ProfileMenu/ProfileMenuDesktop";
import ProfileMenuMobile from "@/pages/Profile/ProfileMenu/ProfileMenuMobile";
import ProfileNamePage from "@/pages/Profile/ProfileName";
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
import ProfileBirthDatePage from "@/pages/Profile/ProfileBirthDate";
import ProfileChangeEmail from "@/pages/Profile/ProfileChangeEmail";
import ProfileChangePasswordPage from "@/pages/Profile/ProfileChangePassword";
import ProfileChangePhonePage from "@/pages/Profile/ProfileChangePhone";
import ProfileChangeWithdrawalPasswordPage from "@/pages/Profile/ProfileChangeWithdrawalPassword";
import ProfileEmailPage from "@/pages/Profile/ProfileEmail";
import ProfileFacebookMessengerPage from "@/pages/Profile/ProfileFacebookMessenger";
import ProfileLinePage from "@/pages/Profile/ProfileLine";
import ProfilePhonePage from "@/pages/Profile/ProfilePhone";
import ProfileQQPage from "@/pages/Profile/ProfileQQ";
import ProfileResetWithdrawalPasswordPage from "@/pages/Profile/ProfileResetWithdrawalPassword";
import ProfileTelegramPage from "@/pages/Profile/ProfileTelegram";
import ProfileViberPage from "@/pages/Profile/ProfileViber";
import ProfileWithdrawalPasswordPage from "@/pages/Profile/ProfileWIthdrawalPassword";
import ProfileWeChatPage from "@/pages/Profile/ProfileWeChat";
import ProfileWhatsappPage from "@/pages/Profile/ProfileWhatsapp";
import Promotion from "@/pages/Promotion";
import RegisterPage from "@/pages/Register";
import Report from "@/pages/Report";
import Transfer from "@/pages/Transfer";
import VIP from "@/pages/Vip";
import Withdrawal from "@/pages/Withdrawal";
import WithdrawalDetails from "@/pages/Withdrawal/WithdrawalDetails";
import config from "@/config/config";
import PromotionDetail from "@/pages/Promotion/PromotionDetail";
import DefaultLayout from "@/layouts/DefaultLayout";
import ForgotPasswordPage from "@/pages/ForgetPassword";
import DialogLayout from "@/layouts/DialogLayout";
import { ValueOf } from "@/types/valueOf";

export const ProfilePathEnum = {
  PROFILE: "/profile",
  NAME: "/profile/name",
  WECHAT: "/profile/wechat",
  BIRTHDATE: "/profile/birthdate",
  QQ: "/profile/qq",
  FB: "/profile/fb",
  TELEGRAM: "/profile/telegram",
  LINE: "/profile/line",
  VIBER: "/profile/viber",
  WHATSAPP: "/profile/whatsapp",
  EMAIL: "/profile/email",
  CHANGE_EMAIL: "/profile/changeemail",
  CHANGE_PHONE: "/profile/changephone",
  PHONE: "/profile/phone",
  CHANGE_PASSWORD: "/profile/changepassword",
  WIDHDRAWAL_PASSWORD: "/profile/withdrawalpassword",
  RESET_WITHDRAWAL_PASSWORD: "/profile/resetwithdrawalpassword",
  CHANGE_WITHDRAWAL_PASSWORD: "/profile/changewithdrawalpassword",
};

export const profilePageDictionary: {
  [key in ValueOf<typeof ProfilePathEnum>]: NamedExoticComponent<any>;
} = {
  [ProfilePathEnum.PROFILE]: ProfileMenuMobile,
  [ProfilePathEnum.NAME]: ProfileNamePage,
  [ProfilePathEnum.NAME]: ProfileNamePage,
};
