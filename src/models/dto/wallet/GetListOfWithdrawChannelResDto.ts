class WithdrawChannel {
  banktype: string = "";
  channelcode: string = "";
  channelid: string = "";
  channelname: string = "";
  displayorder: number = 0;
  extended: string = "";
  feepercentile: number = 0;
  id: string = "";
  methodcode: string = "";
  methodid: string = "";
  paymentcode: string = "";
  paymentid: string = "";
  transferlimit: {
    from: number;
    to: number;
  } = {
    from: 0,
    to: 0,
  };
}

export class GetListOfWithdrawChannelResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: WithdrawChannel[] = [];
  info: string | null = null;
}
