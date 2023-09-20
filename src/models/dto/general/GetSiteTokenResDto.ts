export class GetSiteTokenResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    err: number;
    errmsg: string;
    errmsgid: string;
    token: string;
    expires: number;
  };
}
