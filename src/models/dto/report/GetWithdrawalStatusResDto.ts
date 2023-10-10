export interface GetWithdrawalStatusResDto {
  IsSuccess: boolean;
  code: number;
  data: { [key: string]: string | null };
  info: string | null;
}
