import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import i18n from "@/utils/i18n";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import config from "@/config/config";
import { useHistory } from "react-router-dom";

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

type Props = {};

interface ProfileItem {
  key: string;
  label: string;
  status: string;
  routePath: string;
}

const ProfileMenuDialog = ({}: Props) => {
  const { account } = useAccountStore();
  const history = useHistory();

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
        routePath: "/profile/name",
      },
      phone: {
        key: "phone",
        label: i18n.t("profile.phone.title"),
        status: account.info.member_phone
          ? account.info.member_phone.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/phone",
      },
      email: {
        key: "email",
        label: i18n.t("common.emailAddress"),
        status: account.info.member_email
          ? account.info.member_email
          : i18n.t("profile.notSet"),
        routePath: "/profile/email",
      },
      birth: {
        key: "birthdate",
        label: i18n.t("profile.birthdate.title"),
        status: account.info.member_birthdate
          ? account.info.member_birthdate
          : i18n.t("profile.notSet"),
        routePath: "/profile/birthdate",
      },
      qq: {
        key: "qq",
        label: i18n.t("common.qqNumber"),
        status: account.info.member_qq
          ? account.info.member_qq.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/qq",
      },
      wechat: {
        key: "wechat",
        label: i18n.t("common.wechatNumber"),
        status: account.info.member_wechat
          ? account.info.member_wechat.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/wechat",
      },
      password: {
        key: "changepassword",
        label: i18n.t("profile.password.title"),
        status: "",
        routePath: "/profile/changepassword",
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
        routePath: `/profile/${platform}`,
      };
    });
  }, []);

  const handleClickProfileItem = useCallback((newProfileItem: ProfileItem) => {
    history.push(newProfileItem.routePath);
  }, []);

  return (
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
          key={profileItemDictionary["qq"].key}
          profileItem={profileItemDictionary["qq"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRow
          key={profileItemDictionary["wechat"].key}
          profileItem={profileItemDictionary["wechat"]}
          handleClick={handleClickProfileItem}
        />

        {customMessagingList.map((messagingItem) => {
          return (
            <ProfileRow
              key={messagingItem.key}
              profileItem={messagingItem}
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
  );
};

export default React.memo(ProfileMenuDialog);
