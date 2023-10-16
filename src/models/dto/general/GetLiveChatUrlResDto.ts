class DataDto {
  name: string = "";
  setting: string = "";
}
export class GetLiveChatUrlResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
