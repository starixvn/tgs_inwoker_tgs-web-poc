export class LogoutResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: {
    err: number;
    errmsg: string;
    errmsgid: string;
    updatetime: number;
  };
  info: string | null = null;
}
