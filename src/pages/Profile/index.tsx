import React, { useMemo } from "react";
import { useRwd } from "@/hooks/useRwd";
import {
  profilePageDictionary,
  ProfilePathEnum,
} from "@/components/Account/Profile/profilePageDictionary";
import { useLocation } from "react-router";
import { ValueOf } from "@/types/valueOf";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import styled from "styled-components";
import Dialog from "@/components/UI/Dialog/Dialog";
import { useHistory } from "react-router-dom";
import ProfileMenu from "@/components/Account/Profile/ProfileMenu";

const ProfileContainer = styled.div`
  max-width: 769px;
  margin: auto;
`;

type Props = {};
const ProfilePage = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;

  const ProfilePageComponent = useMemo(() => {
    return profilePageDictionary[path];
  }, [path]);

  if (path === ProfilePathEnum.PROFILE || !ProfilePageComponent) {
    return (
      <ProfileContainer>
        {isDesktopSize && <UserWalletInfo />}
        <ProfileMenu />
      </ProfileContainer>
    );
  }

  const isDialogOpen = !!ProfilePageComponent;

  const handleCloseDialog = () => {
    history.push("/profile");
  };

  return (
    <ProfileContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize ? <ProfileMenu /> : <ProfilePageComponent />}

      {isDesktopSize && (
        <Dialog isOpen={isDialogOpen} handleCloseDialog={handleCloseDialog}>
          <ProfilePageComponent />
        </Dialog>
      )}
    </ProfileContainer>
  );
};

export default React.memo(ProfilePage);
