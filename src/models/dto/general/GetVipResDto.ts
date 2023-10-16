export class VipData {
  birthBenefit: number = 0;
  cardGameRebate: number = 0;
  level: number = 0;
  levelKeepAccumulateBetAmount: number = 0;
  levelKeepAccumulateDeposit: number = 0;
  levelUpAccumulateBetAmount: number = 0;
  levelUpAccumulateDeposit: number = 0;
  liveDealerRebate: number = 0;
  lotteryRebate: number = 0;
  promotionBenefit: number = 0;
  quarterlyBenefit: number = 0;
  slotRebate: number = 0;
  sportsRebate: number = 0;
  virtualSportsRebate: number = 0;
}

class DataDto {
  items: VipData[] = [];
  totalCount: number = 0;
}

export class GetVipResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
