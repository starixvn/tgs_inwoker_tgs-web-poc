class DataDto {
  err: number = 0;
  errmsg: string = "";
  errmsgid: string = "";
  success: boolean = false;
}

export class JoinPromotionResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
