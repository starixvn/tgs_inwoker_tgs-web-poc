export class PromotionCampaignDetail {
  percentage: number = 0;
  bonusAmountLimit: number = 0;
  turnoverMultiple: number = 0;
}

interface PromotionLocalization {
  [key: string]: {
    desktopBanner: string;
    mobileBanner: string;
    content: string;
    terms: string;
  };
}

export class Promotion {
  campaignDetail: PromotionCampaignDetail[] = [];
  content: string = "";
  desktopBanner: string = "";
  from: string = "";
  id: string = "";
  localization: PromotionLocalization = {};
  mobileBanner: string = "";
  name: string = "";
  order: number = 0;
  promotionType: string = "";
  subSubject: string = "";
  terms: string = "";
  to: string = "";
  vipLevels: number[] = [];
}

export class GetPromotionListResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: Promotion[] = [];
}
