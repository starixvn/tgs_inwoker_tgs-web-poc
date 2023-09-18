import styled from 'styled-components';

type Props = {
    imageUrl: string;
    text: string;
}

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 5px; 
    font-size: 0.875rem;
    background: ${(props: { theme: { primaryLight: any; }; }) => props.theme.primaryLight};
    margin-right: 10px;
    max-width: 100%;
`;

const Text = styled.div`
   color: ${(props: { theme: { white: any; }; }) => props.theme.white};
   margin-left: 7px;
`;

const CardPrompt = ({ imageUrl, text }: Props) => {
    return (
        <Wrapper>
            <img src={imageUrl} alt={text} />
            <Text>{text}</Text>
        </Wrapper>
    );
};

export default CardPrompt;
