import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import refreshImg from "@/assets/images/account/balanceTracker/refresh.svg";

type StyledRefreshButtonProps = {
  isSpinning: boolean;
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledRefreshButton = styled.div<StyledRefreshButtonProps>`
  width: 28px;
  height: 28px;
  margin-right: 8px;
  cursor: pointer;
  animation: ${(props: StyledRefreshButtonProps) =>
    props.isSpinning
      ? css`
          ${spinAnimation} 1s linear infinite
        `
      : "none"};
`;

const RefreshImage = styled.img`
  width: 100%;
`;

type Props = {
  handleClick: () => Promise<void>;
};
const RefreshButton = ({ handleClick }: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefreshClick = async () => {
    setIsSpinning(true);
    await handleClick();
    setIsSpinning(false);
  };

  return (
    <StyledRefreshButton isSpinning={isSpinning} onClick={handleRefreshClick}>
      <RefreshImage src={refreshImg} alt="refresh" />
    </StyledRefreshButton>
  );
};

export default RefreshButton;
