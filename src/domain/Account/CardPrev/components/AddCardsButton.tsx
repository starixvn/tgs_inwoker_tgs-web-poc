import React from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import AddCardIcon from "@/assets/t18/images/card/add-card.svg";

const InputContainer = styled.div`
  padding: 13px 20px;
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-radius: 5px;
  cursor: pointer;
`;

const EmptyCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.tertiaryMiddle};
`;

const EmptyCardDesc = styled.div`
  font-size: 0.937rem;
  color: ${({ theme }) => theme.tertiaryMiddle};
`;

const IconContainer = styled.div`
  width: 38px;
  height: 38px;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

type Props = {
  handleClick: () => void;
};
const AddCardsButton = ({ handleClick }: Props) => {
  return (
    <InputContainer onClick={handleClick}>
      <IconContainer>
        <img src={AddCardIcon} alt={"addCard"} />
      </IconContainer>
      <EmptyCardTitle>{i18n.t("card.msgAddCard")}</EmptyCardTitle>
      <EmptyCardDesc>{i18n.t("card.msgAddCardDesc")}</EmptyCardDesc>
    </InputContainer>
  );
};

export default AddCardsButton;
