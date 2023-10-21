import { media } from "@/theme/breakpoints";
import styled from "styled-components";

type Props = {
  text: string;
  onClick?: () => void;
  size: 'small' | 'large';
};

const StyledButton = styled.button<{ size: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 66px;
  min-height: 27px;
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  background: ${(props) => props.theme.primaryLight};
  color: ${(props) => props.theme.tertiaryMiddle};
  font-size: ${(props) => (props.size === 'small' ? '0.625rem' : props.size === 'large' ? '1.125rem' : '1rem')};
  font-weight: ${(props) => (props.size === 'small' ? '700' : props.size === 'large' ? '500' : '600')};
  
  ${media.sm} {
    cursor: pointer;
  }
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
