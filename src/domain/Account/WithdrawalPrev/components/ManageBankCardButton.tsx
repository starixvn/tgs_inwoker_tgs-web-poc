import React from "react";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import iconImg from "@/assets/t18/images/withdraw/manage-card-icon.svg";

const ButtonContainer = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 0.937rem;
  line-height: 1.098rem;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 7.5px;
`;

type Props = {};
const ManageBankCardButton = (props: Props) => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/card");
  };
  return (
    <ButtonContainer onClick={handleClick}>
      <IconContainer>
        <img src={iconImg} alt={"manage-card"} />
      </IconContainer>

      {i18n.t("withdrawal.manageBank")}
    </ButtonContainer>
  );
};

export default ManageBankCardButton;
