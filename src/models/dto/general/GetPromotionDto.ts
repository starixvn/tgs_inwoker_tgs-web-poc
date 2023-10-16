class Promotion {
  campaignDetail: string = "";
  content: string = "";
  desktopBanner: string = "";
  from: string = "";
  id: string = "";
  localization: string = "";
  mobileBanner: string = "";
  name: string = "";
  order: number = 0;
  promotionType: string = "";
  subSubject: string = "";
  terms: string = "";
  to: string = "";
  vipLevels: number[] = [];
}

export class GetPromotionDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: Promotion[] = [];
}
