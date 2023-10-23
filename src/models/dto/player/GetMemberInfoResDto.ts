export class MemberInfo {
  bankinfoauthentication: boolean = true;
  birthdate: string | null = null;
  email: string | null = null;
  emailauthentication: boolean = true;
  facebookmessenger: string | null = null;
  identityauthentication: boolean = true;
  identityformid: string | null = null;
  identityformstatus: number = 0;
  autotransfertogame: boolean = true;
  registercompleted: boolean | string = "";
  issetpaypassword: boolean = true;
  line: string | null = null;
  phone: string | null = null;
  areacode: string = "";
  phoneauthentication: boolean = false;
  playercode: string | null = null;
  qq: string | null = null;
  realname: string | null = null;
  telegram: string | null = null;
  username: string | null = null;
  viber: string | null = null;
  viplevel: number = 0;
  wechat: string | null = null;
  whatsapp: string | null = null;
}

export class GetMemberInfoResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: MemberInfo = new MemberInfo();
  info: string | null = null;
}
