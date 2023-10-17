import React from "react";
import styled from "styled-components";

type IconContainerProps = {
  $width: string;
  $height: string;
};

const IconContainer = styled.div<IconContainerProps>`
  width: ${({ $width }: IconContainerProps) => $width};
  height: ${({ $height }: IconContainerProps) => $height};

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

type Props = {
  iconUrl: string;
  width: string;
  height: string;
  onClick?: () => void;
};
const Icon = ({ iconUrl, onClick, width, height }: Props) => {
  return (
    <IconContainer onClick={onClick} $width={width} $height={height}>
      <img src={iconUrl} alt={"icon"} />
    </IconContainer>
  );
};

export default Icon;
