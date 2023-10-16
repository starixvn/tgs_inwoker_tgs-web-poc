class DataDto {
  main: number = 0;
}

export class GetWalletBalanceResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
