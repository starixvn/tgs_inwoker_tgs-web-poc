import { Promotion } from "src/models/dto/general/GetPromotionListResDto";
export interface GeneralState {
  banner: any[];
  brand: {
    hasInvitationCode: boolean;
    loadingUrl: string;
  };
  brandLanguage: BrandLanguage[];
  brandsSupport: BrandsSupport[];
  haveAffiliate: boolean;
  isIPRestrict: boolean;
  isMaintenance: boolean;
  itemIndex: number;
  livechat: {
    name: null | string;
    setting: {
      url: string;
    };
    loading: boolean;
  };
  mobilePrefix: [];
  promotionList: {
    items: Promotion[];
  };
  rebates: any[];
  rouletteCount: any[];
  rouletteHistory: any[];
  token: string;
  joinPromoResult: JoinPromoResult;
}

export interface BrandsSupport {
  appid: string | null;
  phone: string | null;
  qrcodeurl: string | null;
  type: string;
}

export interface BrandLanguage {
  culturecode: string;
}

export interface JoinPromoResult {
  success: boolean;
  err: number;
  errmsg: string;
  errmsgid: null;
}