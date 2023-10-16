class DataDto {
  amount: number = 0;
  paymentid: string = "";
  promotionid: string = "";
  banktype: string = "";
  note: string = "";
  emoneyname: string = "";
  phone: string = "";
}

export class PerformEWalletDepositResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
