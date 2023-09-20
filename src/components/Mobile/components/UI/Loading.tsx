import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const LoadingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  background-color: rgba(0, 0, 0, ${(props: Props) => props.opacity});
  opacity: 1;
  height: 100%;
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
  opacity?: number;
};

const Loading = ({ opacity }: Props) => {
  const { general } = useGeneralStore();

  const backgroundOpacity = typeof opacity === "number" ? opacity : 0.5;

  return (
    <LoadingContainer opacity={backgroundOpacity}>
      <Inner>
        <LogoImg src={general.brand && general.brand.loadingUrl} />
        <div className="clear"></div>
        <CircularProgress
          size={80}
          style={{ margin: "30px 0 0 80px", color: theme.primary }}
        ></CircularProgress>
      </Inner>
    </LoadingContainer>
  );
};

export default Loading;
