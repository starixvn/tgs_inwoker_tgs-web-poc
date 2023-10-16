class Roulette {
  "promotionid": string = "";
  "promotiontype": string = "";
  "roulettecount": number = 0;
}

export class GetPromotionRouletteCountResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: Roulette[] = [];
}
