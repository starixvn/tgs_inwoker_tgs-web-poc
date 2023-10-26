import React from "react";
import styled from "styled-components";
import deleteIcon from "@/assets/t18/images/card/delete.svg";

const InputContainer = styled.div`
  padding: 13px 20px;
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 5px;
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.tertiaryLight};
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  padding-bottom: 10px;
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentRow = styled.div``;
const Icon = styled.div`
  width: 40px;
  height: 40px;

  & img {
    width: 100%;
    object-fit: cover;
  }
`;

type Props = {
  title: string;
  content: string;
  handleDelete: () => void;
  disable: boolean;
};
const Card = ({ title, content, handleDelete, disable }: Props) => {
  return (
    <InputContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <ContentRow>{content}</ContentRow>
        <ContentRow>
          {!disable && (
            <Icon onClick={handleDelete}>
              <img src={deleteIcon} alt={"delete"} />
            </Icon>
          )}
        </ContentRow>
      </CardContent>
    </InputContainer>
  );
};

export default Card;
