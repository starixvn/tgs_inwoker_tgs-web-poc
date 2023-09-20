export class JoinPromotionResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    err: number;
    errmsg: string;
    errmsgid: string;
    success: boolean;
  };
}
