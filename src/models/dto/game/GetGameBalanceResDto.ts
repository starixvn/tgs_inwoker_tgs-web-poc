class DataDto {
  balance: number = 0;
}

export class GetGameBalanceResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
