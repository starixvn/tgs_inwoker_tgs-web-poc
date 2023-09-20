export class DepositMethod {
  banktype: string;
  channelcode: string;
  channelid: string;
  channelname: string;
  displayorder: number;
  extended: string;
  feepercentile: number;
  id: string;
  methodcode: string;
  methodid: string;
  paymentcode: string;
  paymentid: string;
  transferlimit: {
    from: number;
    to: number;
  };
}

export class GetDepositMethodResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DepositMethod[];
  info: string | null = null;
}
