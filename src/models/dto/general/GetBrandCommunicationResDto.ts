export class BrandCommunication {
  type: string = "";
  phone: string = "";
  appid: string = "";
  qrcodeurl: string = "";
}

export class GetBrandCommunicationResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: BrandCommunication[] = [];
}
