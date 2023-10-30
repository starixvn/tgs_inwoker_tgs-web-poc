import React from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import iconAccount from "@/assets/t18/images/account/badge/icon-account.svg";
import { media } from "@/theme/breakpoints";
import { useProfileMenu } from "@/hooks/account/useProfileMenu";
import ProfileRowInDesktop from "@/components/Account/Profile/ProfileMenu/components/ProfileRowInDesktop";
import PageBadge from "@/components/PageBadge";
import iconDeposit from "@/assets/t18/images/account/badge/icon-deposit.svg";
import AccountPaper from "@/components/AccountPaper";

const ProfileMenuContainer = styled.div`
  background: ${({ theme }) => theme.primaryLight};
  padding: 40px 30px;
  margin: 22px;
  border-radius: 20px;
  ${media.lg} {
    margin: 0;
  }
`;

type Props = {};

const ProfileMenuDesktop = ({}: Props) => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } =
    useProfileMenu();

  return (
    <AccountPaper
      pageName={i18n.t("deposit.details.account")}
      iconUrl={iconAccount}
    >
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["name"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["phone"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["email"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileRowInDesktop
        profileItem={profileItemDictionary["birth"]}
        handleClick={handleClickProfileItem}
      />

      <ProfileRowInDesktop
        key={profileItemDictionary["qq"].key}
        profileItem={profileItemDictionary["qq"]}
        handleClick={handleClickProfileItem}
      />
      <ProfileRowInDesktop
        key={profileItemDictionary["wechat"].key}
        profileItem={profileItemDictionary["wechat"]}
        handleClick={handleClickProfileItem}
      />

      {customMessagingList.map((messagingItem) => {
        return (
          <ProfileRowInDesktop
            key={messagingItem.key}
            profileItem={messagingItem}
            handleClick={handleClickProfileItem}
          />
        );
      })}

      <ProfileRowInDesktop
        profileItem={profileItemDictionary["password"]}
        handleClick={handleClickProfileItem}
      />
    </AccountPaper>
  );
};

export default React.memo(ProfileMenuDesktop);
