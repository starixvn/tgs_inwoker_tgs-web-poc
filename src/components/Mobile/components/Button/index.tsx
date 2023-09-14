import React, { CSSProperties } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div<{ color?: string }>`
  padding: 12px 20px;
  background: ${({ color }) => color || "#5D50E0"};
  color: #ffffff;
  border-radius: 12px;
  border: 0;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.318rem;
  cursor: pointer;
`;

type Props = {
  label: string;
  handleClick: () => void;
  color?: string;
  style?: CSSProperties;
};
const Button = ({ label, handleClick, color, style }: Props) => {
  return (
    <ButtonContainer
      onClick={handleClick}
      color={color as string}
      style={style}
    >
      {label}
    </ButtonContainer>
  );
};

export default Button;
