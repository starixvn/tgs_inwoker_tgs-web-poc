import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import HeaderDialog from "@/components/Mobile/components/UI/Dialog/HeaderDialog";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const theme = themeList["mobileT18"];

const ProfileCard = styled.div`
  width: 100%;
  background: ${theme.primaryLight};
  border-radius: 10px;
  padding: 30px 63px;

  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileItemContainer = styled.div`
  width: 100%;
  padding: 21px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & .label {
    color: ${theme.white};
    font-size: 1.25rem;
    font-weight: 400;
  }

  & .status {
    color: ${theme.tertiary};
    font-size: 0.93rem;
    font-weight: 400;
  }

  & svg {
    color: ${theme.tertiary} !important;
  }
`;

type ProfileItemProps = {
  profileItem?: ProfileItem;
};
const ProfileRow = ({ profileItem }: ProfileItemProps) => {
  if (!profileItem) return null;

  const { label, status } = profileItem;
  return (
    <ProfileItemContainer>
      <div>
        <div className={"label"}>{label}</div>
        <div className={"status"}>{status}</div>
      </div>

      <NavigateNextIcon style={{ transform: "scale(2)" }} />
    </ProfileItemContainer>
  );
};

type Props = {
  isOpen: boolean;
  toggleDialog: () => void;
};

interface ProfileItem {
  key: string;
  label: string;
  status: string;
}

const ProfileDialog = ({ isOpen, toggleDialog }: Props) => {
  const profileItemDictionary = useMemo(() => {
    return {
      name: {
        key: "name",
        label: "Real Name",
        status: "Not Yet Verified",
      },
      phone: {
        key: "phone",
        label: "Phone Number",
        status: "Not Yet Verified",
      },
      email: {
        key: "email",
        label: "Email Address",
        status: "Not Yet Verified",
      },
      birth: {
        key: "birth",
        label: "Birth Date",
        status: "Not Set",
      },
      qq: {
        key: "qq",
        label: "QQ",
        status: "Not Set",
      },
      wechat: {
        key: "wechat",
        label: "Wechat Account",
        status: "Not Set",
      },
      password: {
        key: "password",
        label: "Login Password",
        status: "",
      },
    };
  }, []);
  return (
    <HeaderDialog
      isOpen={isOpen}
      toggleDialog={toggleDialog}
      dialogHeaderTitle={"Account"}
    >
      <ProfileCard>
        <ProfileRow profileItem={profileItemDictionary["name"]} />
        <ProfileRow profileItem={profileItemDictionary["phone"]} />
        <ProfileRow profileItem={profileItemDictionary["email"]} />
        <ProfileRow profileItem={profileItemDictionary["birth"]} />
      </ProfileCard>

      <ProfileCard>
        <ProfileRow profileItem={profileItemDictionary["qq"]} />
        <ProfileRow profileItem={profileItemDictionary["wechat"]} />
      </ProfileCard>

      <ProfileCard>
        <ProfileRow profileItem={profileItemDictionary["password"]} />
      </ProfileCard>
    </HeaderDialog>
  );
};

export default React.memo(ProfileDialog);
