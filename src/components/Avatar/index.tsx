import React from "react";
import avatarImg from "@/assets/t18/images/account/avatar.png";
import styled from "styled-components";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.tertiary};
`;

type Props = {
  hideName?: boolean;
};
const Avatar = ({ hideName }: Props) => {
  const { account } = useAccountStore();
  const username = account.info.member_username;

  return (
    <AvatarContainer>
      <div className={".avatar"}>
        <img src={avatarImg} alt={"avatar"} />
      </div>
      {!hideName && username}
    </AvatarContainer>
  );
};

export default Avatar;
