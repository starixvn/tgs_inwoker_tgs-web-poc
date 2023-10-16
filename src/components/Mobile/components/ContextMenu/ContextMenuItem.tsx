import styled from "styled-components";

const ContextMenuItemContainer = styled.div`
    width: 248px;
    height: 48px;
    font-size: 1.125rem;
    font-weight: 500;
    cursor: pointer;
    background: #2C3544;
    color: #B2C3EC;
    padding: 12px 20px;
    border-radius: 12px;
    gap: 10px;
    display: flex;
`;

const IconContainer = styled.div`
    width: 24px;
    height: 24px;
`;

type ContextMenuItemProps = {
    iconUrl: string;
    label: string;
    onClick?: () => void;
}

const ContextMenuItem = ({ label, iconUrl, onClick }: ContextMenuItemProps) => {

    return (
        <ContextMenuItemContainer onClick={onClick}>
            <IconContainer>
              <img src={iconUrl} alt={label} />
            </IconContainer>
            {label}
        </ContextMenuItemContainer>
    )
}

export default ContextMenuItem;