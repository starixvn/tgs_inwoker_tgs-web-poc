import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NameDialog from "@/components/Mobile/components/Mine/AccountNavigations/AccountDialog/NameDialog";
import { useDialogOpenState } from "@/components/Mobile/hooks/account/useDialogOpenState";
import PhoneDialog from "@/components/Mobile/components/Mine/AccountNavigations/AccountDialog/PhoneDialog";
import EmailDialog from "@/components/Mobile/components/Mine/AccountNavigations/AccountDialog/EmailDialog";
import BirthDialog from "@/components/Mobile/components/Mine/AccountNavigations/AccountDialog/BirthDialog";
import QQDialog from "@/components/Mobile/components/Mine/AccountNavigations/AccountDialog/QQDialog";
import WechatDialog from "@/components/Mobile/components/Mine/AccountNavigations/AccountDialog/WechatDialog";
import PasswordDialog from "@/components/Mobile/components/Mine/AccountNavigations/AccountDialog/PasswordDialog";

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
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRow = ({ profileItem, handleClick }: ProfileItemProps) => {
  if (!profileItem) return null;

  const { label, status } = profileItem;

  return (
    <ProfileItemContainer
      onClick={() => {
        if (!profileItem) return;
        handleClick(profileItem);
      }}
    >
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
  handleCloseDialog: () => void;
};

interface ProfileItem {
  key: string;
  label: string;
  status: string;
}

const AccountDialog = ({ isOpen, handleCloseDialog }: Props) => {
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

  const { dialogOpenState, handleToggleDialog } =
    useDialogOpenState<ProfileItem>(profileItemDictionary);

  const handleClickProfileItem = useCallback((newProfileItem: ProfileItem) => {
    handleToggleDialog(newProfileItem.key);
  }, []);

  const handleCloseProfileItem = useCallback(() => {
    handleToggleDialog();
  }, []);

  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Account"}
      >
        <>
          <ProfileCard>
            <ProfileRow
              profileItem={profileItemDictionary["name"]}
              handleClick={handleClickProfileItem}
            />
            <ProfileRow
              profileItem={profileItemDictionary["phone"]}
              handleClick={handleClickProfileItem}
            />
            <ProfileRow
              profileItem={profileItemDictionary["email"]}
              handleClick={handleClickProfileItem}
            />
            <ProfileRow
              profileItem={profileItemDictionary["birth"]}
              handleClick={handleClickProfileItem}
            />
          </ProfileCard>

          <ProfileCard>
            <ProfileRow
              profileItem={profileItemDictionary["qq"]}
              handleClick={handleClickProfileItem}
            />
            <ProfileRow
              profileItem={profileItemDictionary["wechat"]}
              handleClick={handleClickProfileItem}
            />
          </ProfileCard>

          <ProfileCard>
            <ProfileRow
              profileItem={profileItemDictionary["password"]}
              handleClick={handleClickProfileItem}
            />
          </ProfileCard>
        </>
      </DialogWithHeader>

      {/* Dialogs */}
      <NameDialog
        isOpen={dialogOpenState["name"]}
        handleCloseDialog={handleCloseProfileItem}
      />
      <PhoneDialog
        isOpen={dialogOpenState["phone"]}
        handleCloseDialog={handleCloseProfileItem}
      />
      <EmailDialog
        isOpen={dialogOpenState["email"]}
        handleCloseDialog={handleCloseProfileItem}
      />
      <BirthDialog
        isOpen={dialogOpenState["birth"]}
        handleCloseDialog={handleCloseProfileItem}
      />
      <QQDialog
        isOpen={dialogOpenState["qq"]}
        handleCloseDialog={handleCloseProfileItem}
      />
      <WechatDialog
        isOpen={dialogOpenState["wechat"]}
        handleCloseDialog={handleCloseProfileItem}
      />
      <PasswordDialog
        isOpen={dialogOpenState["password"]}
        handleCloseDialog={handleCloseProfileItem}
      />
    </>
  );
};

export default React.memo(AccountDialog);
