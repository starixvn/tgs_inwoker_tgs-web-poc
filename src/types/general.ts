export interface GeneralState {
  banner: any[];
  brand: {
    hasInvitationCode: boolean;
    loadingUrl: string;
  };
  brandLanguage: {
    culturecode: string;
  }[];
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
    items: {
      campaignDetail: {
        percentage: number;
        bonusAmountLimit: number;
        turnoverMultiple: number;
      }[];
    };
  };
  rebates: any[];
  rouletteCount: any[];
  rouletteHistory: any[];
  token: string;
}

export interface BrandsSupport {
  appid: string | null;
  phone: string | null;
  qrcodeurl: string | null;
  type: string;
}
