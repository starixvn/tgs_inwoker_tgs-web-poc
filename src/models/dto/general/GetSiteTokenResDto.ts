class DataDto {
  err: number = 0;
  errmsg: string = "";
  errmsgid: string = "";
  token: string = "";
  expires: number = 0;
}

export class GetSiteTokenResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
