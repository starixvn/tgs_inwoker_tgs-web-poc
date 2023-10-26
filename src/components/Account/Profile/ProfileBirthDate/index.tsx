import React, { useEffect } from "react";
import Birthdate from "@/domain/Account/Profile/BirthDate";
import { usePageName } from "@/hooks/usePageName/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const ProfileBirthDatePage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.birthdate.title"));
  }, []);

  return <Birthdate />;
};

export default ProfileBirthDatePage;
