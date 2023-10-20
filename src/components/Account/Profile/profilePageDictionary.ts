import { NamedExoticComponent } from "react";
import ProfileMenuMobile from "@/components/Account/Profile/ProfileMenu/components/ProfileMenuMobile";
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
