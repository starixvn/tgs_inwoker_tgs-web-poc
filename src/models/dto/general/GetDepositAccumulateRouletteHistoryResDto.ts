class RouletteHistory {
  createdon: string = "";
  date: string = "";
  id: string = "";
  itemindex: number = 0;
}

export class GetDepositAccumulateRouletteHistoryResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: RouletteHistory[] = [];
}
