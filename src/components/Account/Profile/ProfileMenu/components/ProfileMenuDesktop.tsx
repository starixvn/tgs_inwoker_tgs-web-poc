import React from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import iconAccount from "@/assets/images/account/icon-account.svg";
import Icon from "@/components/Icon";
import { media } from "@/theme/breakpoints";
import { useProfileMenu } from "@/hooks/account/useProfileMenu";
import ProfileRowInDesktop from "@/components/Account/Profile/ProfileMenu/components/ProfileRowInDesktop";

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

type Props = {};

const ProfileMenuDesktop = ({}: Props) => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } =
    useProfileMenu();

  return (
    <ProfileMenuContainer>
      <AccountBadge>
        <Icon iconUrl={iconAccount} width={"24px"} height={"24px"} />
        {i18n.t("deposit.details.account")}
      </AccountBadge>

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
    </ProfileMenuContainer>
  );
};

export default React.memo(ProfileMenuDesktop);
