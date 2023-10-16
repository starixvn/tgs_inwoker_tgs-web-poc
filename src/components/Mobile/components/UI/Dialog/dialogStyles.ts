import styled from "styled-components";

export const DialogTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
`;
export const DialogContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.2rem;
  margin-bottom: 20px;
`;

export const ButtonConfirm = styled.div`
  width: 50%;
  height: 90px;
  border-radius: 20px;
  font-size: 34px;
  text-align: center;
  padding-top: 24px;
  margin: 10px auto;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
`;
