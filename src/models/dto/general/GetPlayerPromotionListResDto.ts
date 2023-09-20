export class PlayerPromotion {
  joinedOn: string = "";
  promotionName: string = "";
}

export class GetPlayerPromotionListResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    items: PlayerPromotion[];
    totalCount: number;
  };
}
