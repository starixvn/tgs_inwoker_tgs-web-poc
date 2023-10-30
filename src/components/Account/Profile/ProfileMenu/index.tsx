import React, { useEffect } from "react";
import { useRwd } from "@/hooks/useRwd";
import ProfileMenuDesktop from "@/components/Account/Profile/ProfileMenu/components/ProfileMenuDesktop";
import ProfileMenuMobile from "@/components/Account/Profile/ProfileMenu/components/ProfileMenuMobile";
import i18n from "@/utils/i18n";
import { usePageName } from "@/hooks/usePageName/usePageName";

type Props = {};
const ProfileMenu = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    updatePageName(i18n.t("profile.basicInfo"));
  }, []);

  return <>{isDesktopSize ? <ProfileMenuDesktop /> : <ProfileMenuMobile />}</>;
};

export default ProfileMenu;
