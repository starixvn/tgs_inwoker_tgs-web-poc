export interface DepositStatusDictionary {
  [key: string]: string | null;
}

export interface GetDepositStatusResDto {
  IsSuccess: boolean;
  code: number;
  data: DepositStatusDictionary;
  info: string | null;
}
