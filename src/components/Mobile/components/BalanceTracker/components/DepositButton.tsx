import { useHistory } from "react-router-dom";
import React, { useCallback } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import styled from "styled-components";

const DepositButtonContainer = styled.div`
  background: linear-gradient(180deg, #922acf 0%, #2f26ad 100%);
  border-radius: 5px;
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DepositButton = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push("/deposit");
  }, []);
  return (
    <DepositButtonContainer>
      <AddIcon onClick={handleClick} />
    </DepositButtonContainer>
  );
};

export default DepositButton;
