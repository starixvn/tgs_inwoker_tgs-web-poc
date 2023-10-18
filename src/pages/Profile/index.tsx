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
import Dialog from "@/components/UI/Dialog/Dialog";
import ProfileMenuMobile from "@/pages/Profile/ProfileMenu/ProfileMenuMobile";
import { useHistory } from "react-router-dom";

const ProfileContainer = styled.div`
  max-width: 769px;
  margin: auto;
`;

type Props = {};
const ProfilePage = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;

  useEffect(() => {
    updatePageName(i18n.t("profile.basicInfo"));
  }, []);

  const Component = useMemo(() => {
    return profilePageDictionary[path];
  }, [path]);

  if (path === ProfilePathEnum.PROFILE || !Component) {
    return (
      <ProfileContainer>
        {isDesktopSize && <UserWalletInfo />}
        {isDesktopSize ? <ProfileMenuDesktop /> : <ProfileMenuMobile />}
      </ProfileContainer>
    );
  }

  const isDialogOpen = !!Component;

  const handleCloseDialog = () => {
    history.push("/profile");
  };

  return (
    <ProfileContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize ? <ProfileMenuDesktop /> : <Component />}

      <Dialog isOpen={isDialogOpen} handleCloseDialog={handleCloseDialog}>
        <Component />
      </Dialog>
    </ProfileContainer>
  );
};

export default React.memo(ProfilePage);
