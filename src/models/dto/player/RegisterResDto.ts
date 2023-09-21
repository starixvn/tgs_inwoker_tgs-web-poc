class DataDto {
  err: number = 0;
  errmsg: string = "";
  errmsgid: string = "";
  uid: string = "";
  isnew: boolean = true;
}

export class RegisterResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
