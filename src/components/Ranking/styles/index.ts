import styled from "styled-components";

export const RankingTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const RankingTableTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 0.875rem;
  margin: 0 0 20px;

  & * {
    color: ${(props) => props.theme.tertiary} !important;
  }
`;
export const RankTableBody = styled.div`
  width: 100%;
`;

export const RankTableRow = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 0.875rem;

  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RankTableCol = styled.div`
  color: ${(props) => props.theme.white};
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    justify-content: start;
  }
  &:last-child {
    justify-content: end;
  }
`;
