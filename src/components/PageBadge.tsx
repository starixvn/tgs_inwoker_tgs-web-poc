import React from "react";
import Icon from "@/components/Icon";
import styled from "styled-components";

const PageBadgeContainer = styled.div`
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  width: fit-content;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.437rem;
`;

type Props = {
  iconUrl: string;
  width?: string;
  height?: string;
  text: string;
};
const PageBadge = ({ iconUrl, width, height, text, ...others }: Props) => {
  return (
    <PageBadgeContainer {...others}>
      <Icon
        iconUrl={iconUrl}
        width={width || "24px"}
        height={height || "24px"}
      />
      {text}
    </PageBadgeContainer>
  );
};

export default PageBadge;
