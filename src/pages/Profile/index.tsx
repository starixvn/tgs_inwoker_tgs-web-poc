import React, { useEffect } from "react";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import { useRwd } from "@/hooks/useRwd";
import ProfileMenuDesktop from "@/pages/Profile/ProfileMenu/ProfileMenuDesktop";
import ProfileMenuMobile from "@/pages/Profile/ProfileMenu/ProfileMenuMobile";

type Props = {};
const ProfilePage = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    updatePageName(i18n.t("profile.basicInfo"));
  }, []);

  return isDesktopSize ? <ProfileMenuDesktop /> : <ProfileMenuMobile />;
};

export default ProfilePage;
