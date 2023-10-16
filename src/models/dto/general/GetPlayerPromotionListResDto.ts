export class PlayerPromotion {
  joinedOn: string = "";
  promotionName: string = "";
}

class DataDto {
  items: PlayerPromotion[] = [];
  totalCount: number = 0;
}

export class GetPlayerPromotionListResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
