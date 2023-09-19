import styled from 'styled-components';

type Props = {
    imageUrl?: string;
    text: string;
    isActive: boolean;
    fontSize: 'small' | 'smaller';
    onClick: () => void;
}

const Wrapper = styled.div<{ text: string, isActive: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    padding: 4px 8px;
    border-radius: 50px;
    background-color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.tertiaryDark};
    margin-right: 6px;
    cursor: pointer;
    user-select: none;
     & > img {
        width: 24px;
        margin: 0 4px;
     }
`;

const Text = styled.div<{ isActive: boolean }>`
    color: ${(props) =>
        props.isActive ? props.theme.white : props.theme.tertiary};
    font-size: 0.875rem;
    font-weight: 700;   
    line-height: 0.875rem;
    padding: 5px 0;
`;

const Tag = ({ imageUrl, text, isActive, onClick }: Props) => {
    return (
        <Wrapper isActive={isActive} text={text} onClick={onClick}>
            {imageUrl && <img src={imageUrl} alt={text} />}
            <Text isActive={isActive}>{text}</Text>
        </Wrapper>
    );
};

export default Tag;
