export class GetLiveChatUrlResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    name: string;
    setting: string;
  };
}
