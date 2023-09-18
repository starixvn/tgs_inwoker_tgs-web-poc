import styled from 'styled-components';

type Props = {
    imageUrl: string;
    text: string;
    isActive: boolean;
    fontSize: 'small' | 'smaller';
    onClick: () => void;
}

const Wrapper = styled.div<{ imageUrl: string, text: string, isActive: boolean }>`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 77px;
    border-radius: 12px;
    background-color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.primaryLight};
    margin-right: 12px;
    cursor: pointer;
    user-select: none;
`;

const Text = styled.div<{ fontSize: string }>`
    color: ${(props) => props.theme.white};
    font-size: ${(props) =>
        props.fontSize === 'small' ? '0.875rem' : '0.6875rem'
    };
`;

const Tab = ({ imageUrl, text, isActive, fontSize, onClick }: Props) => {
    return (
        <Wrapper isActive={isActive} imageUrl={imageUrl} text={text} onClick={onClick}>
            <img src={imageUrl} alt={text} />
            <Text fontSize={fontSize}>{text}</Text>
        </Wrapper>
    );
};

export default Tab;
