class DataDto {
  err: number = 0;
  errmsg: string = "";
  errmsgid: string = "";
  updatetime: number = 0;
}

export class LogoutResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
