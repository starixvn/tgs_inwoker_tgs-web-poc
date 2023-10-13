import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProfileMenu from "@/components/Mobile/pages/Profile/ProfileMenu";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const ProfilePage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.basicInfo"));
  }, []);

  return <ProfileMenu />;
};

export default ProfilePage;
