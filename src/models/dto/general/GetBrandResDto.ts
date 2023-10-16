export class Brand {
  brandId: string = "";
  code: string = "";
  desktopLogoUrl: string = "";
  hasInvitationCode: boolean = false;
  loadingUrl: string = "";
  mobileLogoUrl: string = "";
  playerIdentityAuthenticationEnabled: boolean = false;
  playerRegisterFlowSettings: string = "";
  smsEnable: boolean = false;
}

export class GetBrandResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: Brand = new Brand();
}
