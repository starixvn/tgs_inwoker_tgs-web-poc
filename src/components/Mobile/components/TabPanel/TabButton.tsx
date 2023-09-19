import styled from 'styled-components';

type Props = {
    text: string;
    isActive: boolean;
    onClick: () => void;
};

const Wrapper = styled.div<{ text: string, isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 154px;
    height: 38px;
    padding: 0px 10px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.primaryLight};
    color: ${(props) =>
        props.isActive ? props.theme.white : props.theme.tertiaryMiddle};
    font-weight: 500;
`;

const Text = styled.div<{ isActive: boolean }>`
      color: ${(props) =>
        props.isActive ? props.theme.white : props.theme.tertiary};
`;

const TabButton = ({ text, isActive, onClick }: Props) => {
    return (
        <Wrapper isActive={isActive} text={text} onClick={onClick}>
            <Text isActive={isActive}>{text}</Text>
        </Wrapper>
    );
};

export default TabButton;