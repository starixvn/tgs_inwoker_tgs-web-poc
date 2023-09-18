import { useState } from "react"
import styled from "styled-components";
import ContextMenu from "@/components/Mobile/components/ContextMenu";
import avatarImg from "@/assets/images/account/avatar.png";
import SvgIcon from "@/components/Mobile/components/UI/SvgIcon";
import Modal from "@/components/Mobile/components/UI/Modal";

const ContextMenuButtonContainer = styled.div`
  width: 90px;
  height: 40px;
  padding: 4px 4px 4px 15px;
  border-radius: 50px;
  background: #212937;
  display: flex;
  align-items: center;
  justify-content: space-between;
` 

const AvatarContainer = styled.div`
  width: 30px;
  height: 24px;
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
`

const ArrowContainer = styled.div<{
  open: boolean
}>`
  width: 32px;
  height: 32px;
  transform: ${props => props.open ? 'rotate(0deg)' : 'rotate(180deg)'};
  transition: transform 0.3s ease-in-out;
`

const ContextMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <>
      <ContextMenuButtonContainer onClick={handleClick}>
        <AvatarContainer/>
        <ArrowContainer open={isOpen}>
          <SvgIcon pathname="contextMenu/icon_arrow.svg" />
        </ArrowContainer>
      </ContextMenuButtonContainer>
      <Modal open={isOpen} onClose={handleClick} >
        <ContextMenu/>
      </Modal>
    </>
  )
}

export default ContextMenuButton