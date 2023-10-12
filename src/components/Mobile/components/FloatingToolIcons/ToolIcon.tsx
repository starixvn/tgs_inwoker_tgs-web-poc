import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const IconContainer = styled.div`
  transition: all ease-in-out 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

export interface FloatingTool {
  key: string;
  imgUrl: string;
  pathUrl: string;
}

type Props = {
  floatingTool: FloatingTool;
};
const ToolIcon = ({ floatingTool }: Props) => {
  const { name, imgUrl, pathUrl } = floatingTool;
  return (
    <IconContainer>
      <Link to={pathUrl}>
        <img src={imgUrl} alt={name} />
      </Link>
    </IconContainer>
  );
};

export default ToolIcon;
