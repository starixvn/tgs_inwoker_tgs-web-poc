export enum PlatformTypeEnum {
  IS_DESKTOP,
  IS_MOBILE,
}

export class LoginResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: {
    err: number;
    errmsg: string;
    errmsgid: string;
    token: string;
    logintime: number;
  };
  info: string | null = null;
}
