class DataDto {
  err: number = 0;
  errmsg: string = "";
  errmsgid: string = "";
  token: string = "";
  logintime: number = 0;
}

export class LoginResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
