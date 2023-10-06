export interface RoundTotalDto {
  betAmount: number | null;
  validBetAmount: number | null;
  winLoss: number | null;
  settleAmount: number | null;
}

export interface GetRoundsTotalResDto {
  IsSuccess: boolean;
  code: number;
  data: RoundTotalDto;
  info: string | null;
}
