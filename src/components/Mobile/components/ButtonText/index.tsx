import styled from "styled-components";

type Props = {
    text: string;
    onClick?: () => void;
    size: 'small' | 'large';
};

const defaultProps: Partial<Props> = {
    size: 'small',
};

const StyledButton = styled.button<{ size: string }>`
    padding: 6px 10px;
    border: none;
    border-radius: 5px;
    text-align: center;
    background: ${(props) => props.theme.primaryLight};
    color: ${(props) => props.theme.tertiaryMiddle};
    line-height: 14px;
    font-size: ${(props) => (props.size === 'small' ? '0.625rem' : props.size === 'large' ? '1.125rem' : '1rem')};
    font-weight: ${(props) => (props.size === 'small' ? '700' : props.size === 'large' ? '500' : '600')};
`;

const ButtonText = ({ size, text, onClick }: Props) => {
    return (
        <StyledButton
            size={size}
            onClick={onClick}
        >
            {text}
        </StyledButton>
    );
};

export default ButtonText;
