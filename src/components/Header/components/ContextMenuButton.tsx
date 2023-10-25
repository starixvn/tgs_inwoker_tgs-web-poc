import React, { useState } from "react";
import styled from "styled-components";
import ContextMenu from "@/components/ContextMenu";
import avatarImg from "@/assets/images/account/avatar.png";
import SvgIcon from "@/components/UI/SvgIcon";
import Modal from "@/components/UI/Modal";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import { useAuth } from "@/hooks/auth/useAuth";
import arrowImg from "@/assets/images/header/contextMenu/icon_arrow.svg";

const ContextMenuButtonContainer = styled.div`
  height: 40px;
  padding: 4px 4px 4px 15px;
  border-radius: 50px;
  background: #212937;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 30px;
  height: 24px;
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
`;

const UsernameContainer = styled.div`
  display: none;

  ${media.sm} {
    display: block;
    color: white;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.318rem;
    text-overflow: ellipsis;
    max-width: 60px;
  }
`;

const ArrowContainer = styled.div<{
  open: boolean;
}>`
  width: 32px;
  height: 32px;
  transform: ${(props) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
  transition: transform 0.3s ease-in-out;
`;

const ContextMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutState } = useAuth();
  const { account } = useAccountStore();

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const username = account.info.member_username;

  return (
    <>
      <ContextMenuButtonContainer onClick={handleClick}>
        <AvatarContainer />

        <UsernameContainer>{username}</UsernameContainer>

        <ArrowContainer open={isOpen}>
          <SvgIcon pathname={arrowImg} />
        </ArrowContainer>
      </ContextMenuButtonContainer>
      <Modal open={isOpen} onClose={handleClick}>
        <ContextMenu />
      </Modal>

      <Loading show={logoutState.isLoading} noShrink={true} />
    </>
  );
};

export default ContextMenuButton;
