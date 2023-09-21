class DataDto {
  amount: number = 0;
  paymentid: string = "";
  promotionid: string = "";
  banktype: string = "string";
  note: string = "string";
  realname: string = "string";
  phone: string = "string";
}

export class PerformPulsaDepositResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
