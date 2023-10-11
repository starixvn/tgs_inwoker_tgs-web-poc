export interface WithdrawalStatusDictionary {
  [key: string]: string | null;
}

export interface GetWithdrawalStatusResDto {
  IsSuccess: boolean;
  code: number;
  data: WithdrawalStatusDictionary;
  info: string | null;
}
