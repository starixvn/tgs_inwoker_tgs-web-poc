export interface GetDepositStatusResDto {
  IsSuccess: boolean;
  code: number;
  data: { [key: string]: string | null };
  info: string | null;
}
