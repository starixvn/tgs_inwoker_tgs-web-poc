export class RoundTotalDto {
  betAmount: number = 0;
  settleAmount: null | number = null;
  validBetAmount: number = 0;
  winloss: number = 0;
}

export class GetRoundsTotalResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: RoundTotalDto = new RoundTotalDto();
  info: string | null = null;
}
