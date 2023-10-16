class DataDto {
  amount: number = 0;
  paymentid: string = "";
  promotionid: string = "";
}
export class PerformLeePayDepositResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
