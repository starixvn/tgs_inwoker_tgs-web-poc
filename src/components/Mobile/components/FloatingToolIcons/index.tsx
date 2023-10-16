import React, { useMemo } from "react";
import styled from "styled-components";
import supportImg from "@/assets/images/floatingToolIcon/service.svg";
import downloadImg from "@/assets/images/floatingToolIcon/download.svg";
import ToolIcon from "@/components/Mobile/components/FloatingToolIcons/ToolIcon";

const FloatingToolIconsContainer = styled.div`
  z-index: 9999;
  position: fixed;
  right: 22px;
  bottom: 102px;
  overflow: visible;
`;

interface FloatingTool {
  key: string;
  imgUrl: string;
  pathUrl: string;
}

type Props = {};
const FloatingToolIcons = (props: Props) => {
  const floatingTools = useMemo<FloatingTool[]>(() => {
    return [
      // {
      //   key: "download",
      //   imgUrl: downloadImg,
      //   pathUrl: "/appDownload",
      // },
      {
        key: "support",
        imgUrl: supportImg,
        pathUrl: "/support",
      },
    ];
  }, []);

  return (
    <FloatingToolIconsContainer>
      {floatingTools.map((floatingTool) => {
        return <ToolIcon key={floatingTool.key} floatingTool={floatingTool} />;
      })}
    </FloatingToolIconsContainer>
  );
};

export default FloatingToolIcons;
