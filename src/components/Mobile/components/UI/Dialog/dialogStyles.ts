import styled from "styled-components";
import { themeList } from "@/theme";
const theme = themeList["mobileT18"];

export const DialogTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;
export const DialogContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  margin-top: 1rem;
  line-height: 1.2rem;
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
