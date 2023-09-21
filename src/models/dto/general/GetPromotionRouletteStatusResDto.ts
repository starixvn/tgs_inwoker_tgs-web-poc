class DataDto {
  id: string = "";
  itemindex: number = 0;
}

export class GetPromotionRouletteStatusResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
