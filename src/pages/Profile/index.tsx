import React, { useEffect, useMemo } from "react";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import { useRwd } from "@/hooks/useRwd";
import {
  profilePageDictionary,
  ProfilePathEnum,
} from "@/pages/Profile/profilePageDictionary";
import { useLocation } from "react-router";
import { ValueOf } from "@/types/valueOf";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import styled from "styled-components";
import ProfileMenuDesktop from "@/pages/Profile/ProfileMenu/ProfileMenuDesktop";

const ProfileContainer = styled.div`
  max-width: 769px;
  margin: auto;
`;

type Props = {};
const ProfilePage = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isDesktopSize } = useRwd();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;

  useEffect(() => {
    updatePageName(i18n.t("profile.basicInfo"));
  }, []);

  const Component = useMemo(() => {
    if (isDesktopSize) return ProfileMenuDesktop;

    return (
      profilePageDictionary[path] ??
      profilePageDictionary[ProfilePathEnum.PROFILE]
    );
  }, [path]);

  return (
    <ProfileContainer>
      {isDesktopSize && <UserWalletInfo />}
      <Component />;
    </ProfileContainer>
  );
};

export default React.memo(ProfilePage);
