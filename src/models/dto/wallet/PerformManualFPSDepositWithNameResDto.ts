class DataDto {
  account: string = "";
  name: string = "";
  amount: number = 0;
  paymentid: string = "";
  promotionid: string = "";
  banktype: string = "";
}

export class PerformManualFPSDepositWithNameResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
