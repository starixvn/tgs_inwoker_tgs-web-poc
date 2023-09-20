export class RegisterResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: {
    err: number;
    errmsg: string;
    errmsgid: string;
    uid: string;
    isnew: boolean;
  };
  info: string | null = null;
}
