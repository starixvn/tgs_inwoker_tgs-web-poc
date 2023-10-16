class DataDto {
  itemindex: number = 0;
}

export class GetDepositAccumulateRouletteResultResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
