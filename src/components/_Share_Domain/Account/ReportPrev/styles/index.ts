import styled from "styled-components";

export const ReportContainer = styled.div``;

export const ReportSummary = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const ReportSummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ReportSummaryCol = styled.div``;

export const ReportCardsContainer = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const ReportCard = styled.div`
  padding: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.tertiaryDark};
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const ReportCardRow = styled.div`
  width: 100%;
  min-height: 40px;
  font-weight: 600;
`;
export const ReportCardCol = styled.span`
  font-weight: normal;
`;

export const CustomWinLose = styled.span`
  color: ${({ value }) => {
    return value === 0 ? "" : value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
`;
