import React from "react";
import styled from "styled-components";

const IntroCardContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.primaryLight};
  border-radius: 10px;
  padding: 22px 38px;
  display: flex;
  align-items: center;

  & .logo {
    width: 48px;
    flex-shrink: 0;
    margin-right: 12px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  & .title {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.153rem;
    color: #f4bd29;
  }

  & .content {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.153rem;
    color: ${({ theme }) => theme.white};
  }
`;

export interface InfoCardItem {
  title: string;
  content: string;
  logo: string;
}

type IntroCardProps = { infoCardItem: InfoCardItem };

const InfoCard = ({ infoCardItem }: IntroCardProps) => {
  const { title, content, logo } = infoCardItem;

  return (
    <IntroCardContainer>
      <div className={"logo"}>
        <img src={logo} alt={title} />
      </div>

      <div className={"wording"}>
        <div className={"title"}>{title}</div>
        <div className={"content"}>{content}</div>
      </div>
    </IntroCardContainer>
  );
};

export default InfoCard;
