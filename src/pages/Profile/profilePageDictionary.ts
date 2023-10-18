import React, { NamedExoticComponent } from "react";
import ProfileMenuMobile from "@/pages/Profile/ProfileMenu/ProfileMenuMobile";
import ProfileBirthDatePage from "@/pages/Profile/ProfileBirthDate";
import ProfileChangeEmail from "@/pages/Profile/ProfileChangeEmail";
import ProfileChangePasswordPage from "@/pages/Profile/ProfileChangePassword";
import ProfileChangePhonePage from "@/pages/Profile/ProfileChangePhone";
import ProfileChangeWithdrawalPasswordPage from "@/pages/Profile/ProfileChangeWithdrawalPassword";
import ProfileEmailPage from "@/pages/Profile/ProfileEmail";
import ProfileFacebookMessengerPage from "@/pages/Profile/ProfileFacebookMessenger";
import ProfileLinePage from "@/pages/Profile/ProfileLine";
import ProfileNamePage from "@/pages/Profile/ProfileName";
import ProfilePhonePage from "@/pages/Profile/ProfilePhone";
import ProfileQQPage from "@/pages/Profile/ProfileQQ";
import ProfileResetWithdrawalPasswordPage from "@/pages/Profile/ProfileResetWithdrawalPassword";
import ProfileTelegramPage from "@/pages/Profile/ProfileTelegram";
import ProfileViberPage from "@/pages/Profile/ProfileViber";
import ProfileWithdrawalPasswordPage from "@/pages/Profile/ProfileWIthdrawalPassword";
import ProfileWeChatPage from "@/pages/Profile/ProfileWeChat";
import ProfileWhatsappPage from "@/pages/Profile/ProfileWhatsapp";
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
  [ProfilePathEnum.WECHAT]: ProfileWeChatPage,
  [ProfilePathEnum.BIRTHDATE]: ProfileBirthDatePage,
  [ProfilePathEnum.QQ]: ProfileQQPage,
  [ProfilePathEnum.FB]: ProfileFacebookMessengerPage,
  [ProfilePathEnum.TELEGRAM]: ProfileTelegramPage,
  [ProfilePathEnum.LINE]: ProfileLinePage,
  [ProfilePathEnum.VIBER]: ProfileViberPage,
  [ProfilePathEnum.WHATSAPP]: ProfileWhatsappPage,
  [ProfilePathEnum.EMAIL]: ProfileEmailPage,
  [ProfilePathEnum.CHANGE_EMAIL]: ProfileChangeEmail,
  [ProfilePathEnum.CHANGE_PHONE]: ProfileChangePhonePage,
  [ProfilePathEnum.PHONE]: ProfilePhonePage,
  [ProfilePathEnum.CHANGE_PASSWORD]: ProfileChangePasswordPage,
  [ProfilePathEnum.WIDHDRAWAL_PASSWORD]: ProfileWithdrawalPasswordPage,
  [ProfilePathEnum.RESET_WITHDRAWAL_PASSWORD]:
    ProfileResetWithdrawalPasswordPage,
  [ProfilePathEnum.CHANGE_WITHDRAWAL_PASSWORD]:
    ProfileChangeWithdrawalPasswordPage,
};
