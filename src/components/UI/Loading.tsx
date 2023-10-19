import React from "react";
import styled from "styled-components";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { CircularProgress } from "@mui/material";

type LoadingContainer = {
  $opacity: number;
  $open: boolean;
};
const LoadingContainer = styled.div<LoadingContainer>`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  background-color: rgba(
    0,
    0,
    0,
    ${({ $opacity }: LoadingContainer) => $opacity}
  );
  ${({ $open }) =>
    $open ? "opacity:1;height: 100%;" : "opacity:0;height:0px;"};
  z-index: 3;
`;
const Inner = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LogoImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 250px;
`;
type Props = {
  show: boolean;
  opacity?: number;
};

const Loading = ({ show, opacity }: Props) => {
  const { general } = useGeneralStore();

  const backgroundOpacity = typeof opacity === "number" ? opacity : 0.5;

  return (
    <LoadingContainer $open={show} $opacity={backgroundOpacity}>
      <Inner>
        <LogoImg src={general.brand && general.brand.loadingUrl} />
        <div className="clear" />
        <CircularProgress
          size={80}
          color={"primary"}
          style={{ margin: "30px 0 0 80px" }}
        />
      </Inner>
    </LoadingContainer>
  );
};

export default Loading;
