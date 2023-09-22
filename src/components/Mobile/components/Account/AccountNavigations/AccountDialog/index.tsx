import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NameDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/NameDialog";
import { useDialogOpenState } from "@/hooks/account/useDialogOpenState";
import PhoneDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/PhoneDialog";
import EmailDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/EmailDialog";
import BirthDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/BirthDialog";
import QQDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/QQDialog";
import WeChatDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/WeChatDialog";
import PasswordDialog from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/PasswordDialog";
import i18n from "@/utils/i18n";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import config from "@/config/config";

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
  const { account } = useAccountStore();

  const getStatus = useCallback(() => {
    const currentFormStatus = account.info.identityformstatus;
    const hasSubmitted = !!account.info.identityformid;

    let status = "";

    if (currentFormStatus === 0 && !hasSubmitted) {
      //api沒給表單id ，表示可以上傳
      return (status = "no");
    }
    if ((currentFormStatus === 1 && hasSubmitted) || currentFormStatus === 1) {
      return (status = "yes");
    }
    if ((currentFormStatus === 2 && hasSubmitted) || currentFormStatus === 2) {
      //有給表單id但是狀態是拒絕，也可以上傳
      return (status = "rejected");
    }
    if (currentFormStatus === 0 && hasSubmitted) {
      //有給表單id但狀態沒驗證，不能上傳
      return (status = "verifying");
    }
    return status;
  }, [account]);

  const profileItemDictionary = useMemo<{
    [key in string]: ProfileItem;
  }>(() => {
    return {
      name: {
        key: "name",
        label: i18n.t("profile.nameVerify.icNum"),
        status: account.info.member_name
          ? i18n.t(
              `${account.info.member_name} ${
                config.features.ShowVerificationStatus
                  ? `(` + i18n.t("verified." + getStatus()) + `)`
                  : ""
              }`
            )
          : i18n.t("profile.notSet"),
      },
      phone: {
        key: "phone",
        label: i18n.t("profile.phone.title"),
        status: account.info.member_phone
          ? account.info.member_phone.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
      },
      email: {
        key: "email",
        label: i18n.t("common.emailAddress"),
        status: account.info.member_email
          ? account.info.member_email
          : i18n.t("profile.notSet"),
      },
      birth: {
        key: "birth",
        label: i18n.t("profile.birthdate.title"),
        status: account.info.member_birthdate
          ? account.info.member_birthdate
          : i18n.t("profile.notSet"),
      },
      qq: {
        key: "qq",
        label: i18n.t("common.qqNumber"),
        status: account.info.member_qq
          ? account.info.member_qq.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
      },
      wechat: {
        key: "wechat",
        label: i18n.t("common.wechatNumber"),
        status: account.info.member_wechat
          ? account.info.member_wechat.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
      },
      password: {
        key: "password",
        label: i18n.t("profile.password.title"),
        status: "",
      },
    };
  }, []);

  const customMessagingList = useMemo<ProfileItem[]>(() => {
    return config.features.CustomMessaging.map((platform: string) => {
      return {
        key: platform,
        label: i18n.t("common." + platform),
        status: account.info["member_" + platform]
          ? account.info["member_" + platform].substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
      };
    });
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
        dialogHeaderTitle={i18n.t("profile.basicInfo")}
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

            {customMessagingList.map((messagingItem) => {
              return (
                <ProfileRow
                  profileItem={profileItemDictionary[messagingItem.key]}
                  handleClick={handleClickProfileItem}
                />
              );
            })}
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
      <WeChatDialog
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
