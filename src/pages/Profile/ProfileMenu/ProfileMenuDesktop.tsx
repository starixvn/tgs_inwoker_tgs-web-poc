import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import config from "@/config/config";
import { useHistory } from "react-router-dom";
import iconAccount from "@/assets/images/account/icon-account.svg";
import Icon from "@/components/Icon";
import { Button } from "@/components/UI/Button";
import { useTheme } from "@mui/material";
import { media } from "@/theme/breakpoints";

const ProfileMenuContainer = styled.div`
  background: ${({ theme }) => theme.primaryLight};
  padding: 40px 30px;
  margin: 22px;
  border-radius: 20px;
  ${media.lg} {
    margin: 0;
  }
`;

const AccountBadge = styled.div`
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  width: fit-content;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.437rem;
`;

const ProfileCard = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.primaryLight};
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
    color: ${({ theme }) => theme.white};
    font-size: 1.25rem;
    font-weight: 400;
  }

  & .status {
    color: ${({ theme }) => theme.tertiary};
    font-size: 0.93rem;
    font-weight: 400;
  }

  & svg {
    color: ${({ theme }) => theme.tertiary} !important;
  }
`;

type ProfileItemProps = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRow = ({ profileItem, handleClick }: ProfileItemProps) => {
  if (!profileItem) return null;
  const theme: any = useTheme();

  const { label, isVerified, status, buttonText } = profileItem;

  return (
    <ProfileItemContainer>
      <div className={"label"} style={{ width: "33%" }}>
        {label}
      </div>
      <div className={"status"} style={{ width: "33%" }}>
        {status}
      </div>

      <Button
        variant={isVerified ? "contained" : "outlined"}
        // color={isVerified ? "primary" : theme.palette.white}
        sx={{
          color: isVerified
            ? theme.palette.white
            : theme.palette.tertiary.light,
          width: "150px",
        }}
        onClick={() => {
          if (!profileItem) return;
          handleClick(profileItem);
        }}
      >
        {buttonText}
      </Button>
    </ProfileItemContainer>
  );
};

type Props = {};

interface ProfileItem {
  key: string;
  label: string;
  isVerified?: boolean;
  status: string;
  routePath: string;
  buttonText: string;
}

const ProfileMenuDesktop = ({}: Props) => {
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
        isVerified: !!account.info.member_name,
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
        buttonText: account.info.member_name
          ? i18n.t("profile.details")
          : i18n.t("profile.nowVerify"),
      },
      phone: {
        key: "phone",
        label: i18n.t("profile.phone.title"),
        isVerified: !!account.info.member_phone,
        status: account.info.member_phone
          ? account.info.member_phone.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/phone",
        buttonText: account.info.member_phone
          ? i18n.t("profile.details")
          : i18n.t("profile.nowVerify"),
      },
      email: {
        key: "email",
        label: i18n.t("common.emailAddress"),
        isVerified: !!account.info.member_email,
        status: account.info.member_email
          ? account.info.member_email
          : i18n.t("profile.notSet"),
        routePath: "/profile/email",
        buttonText: account.info.member_email
          ? i18n.t("profile.details")
          : i18n.t("profile.nowVerify"),
      },
      birth: {
        key: "birthdate",
        label: i18n.t("profile.birthdate.title"),
        isVerified: !!account.info.member_birthdate,
        status: account.info.member_birthdate
          ? account.info.member_birthdate
          : i18n.t("profile.notSet"),
        routePath: "/profile/birthdate",
        buttonText: account.info.member_birthdate
          ? i18n.t("profile.details")
          : i18n.t("profile.setNow"),
      },
      qq: {
        key: "qq",
        label: i18n.t("common.qqNumber"),
        isVerified: !!account.info.member_qq,
        status: account.info.member_qq
          ? account.info.member_qq.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/qq",
        buttonText: account.info.member_qq
          ? i18n.t("profile.details")
          : i18n.t("profile.setNow"),
      },
      wechat: {
        key: "wechat",
        label: i18n.t("common.wechatNumber"),
        isVerified: !!account.info.member_wechat,
        status: account.info.member_wechat
          ? account.info.member_wechat.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/wechat",
        buttonText: account.info.member_wechat
          ? i18n.t("profile.details")
          : i18n.t("profile.setNow"),
      },
      password: {
        key: "changepassword",
        label: i18n.t("profile.password.title"),
        status: "",
        routePath: "/profile/changepassword",
        buttonText: i18n.t("profile.edit"),
      },
    };
  }, []);

  const customMessagingList = useMemo<ProfileItem[]>(() => {
    return config.features.CustomMessaging.map((platform: string) => {
      return {
        key: platform,
        label: i18n.t("common." + platform),
        isVerified: !!account.info["member_" + platform],
        status: account.info["member_" + platform]
          ? account.info["member_" + platform].substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: `/profile/${platform}`,
        buttonText: account.info["member_" + platform]
          ? i18n.t("profile.details")
          : i18n.t("profile.setNow"),
      };
    });
  }, []);

  const handleClickProfileItem = useCallback((newProfileItem: ProfileItem) => {
    history.push(newProfileItem.routePath);
  }, []);

  return (
    <ProfileMenuContainer>
      <AccountBadge>
        <Icon iconUrl={iconAccount} width={"24px"} height={"24px"} />
        {i18n.t("deposit.details.account")}
      </AccountBadge>

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

      <ProfileRow
        profileItem={profileItemDictionary["password"]}
        handleClick={handleClickProfileItem}
      />
    </ProfileMenuContainer>
  );
};

export default React.memo(ProfileMenuDesktop);
