import React from "react";
import styled from "styled-components";
import { useProfileMenu } from "@/hooks/account/useProfileMenu";
import ProfileRowInMobile from "@/components/Account/Profile/ProfileMenu/components/ProfileRowInMobile";

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

type Props = {};

const ProfileMenuMobile = ({}: Props) => {
  const { profileItemDictionary, handleClickProfileItem, customMessagingList } =
    useProfileMenu();

  return (
    <>
      <ProfileCard>
        <ProfileRowInMobile
          profileItem={profileItemDictionary["name"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          profileItem={profileItemDictionary["phone"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          profileItem={profileItemDictionary["email"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          profileItem={profileItemDictionary["birth"]}
          handleClick={handleClickProfileItem}
        />
      </ProfileCard>

      <ProfileCard>
        <ProfileRowInMobile
          key={profileItemDictionary["qq"].key}
          profileItem={profileItemDictionary["qq"]}
          handleClick={handleClickProfileItem}
        />
        <ProfileRowInMobile
          key={profileItemDictionary["wechat"].key}
          profileItem={profileItemDictionary["wechat"]}
          handleClick={handleClickProfileItem}
        />

        {customMessagingList.map((messagingItem) => {
          return (
            <ProfileRowInMobile
              key={messagingItem.key}
              profileItem={messagingItem}
              handleClick={handleClickProfileItem}
            />
          );
        })}
      </ProfileCard>

      <ProfileCard>
        <ProfileRowInMobile
          profileItem={profileItemDictionary["password"]}
          handleClick={handleClickProfileItem}
        />
      </ProfileCard>
    </>
  );
};

export default React.memo(ProfileMenuMobile);
