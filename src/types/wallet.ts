interface TransferChannel {
  channelcode: string;
  channelid: string;
  channelname: string;
  fees: number;
  id: string;
  transferlimit: {
    from: number;
    to: number;
  };
}

export interface WalletState {
  loading: true;
  updateBalanceloading: false;
  transferLoading: false;
  message: "";
  depositList: TransferChannel[];
  depositTypeList: {
    displayorder: number;
    method: {
      channelid: string;
      channelname: string;
      displayorer: number;
      extended: {};
      fees: number;
      id: string;
      transferlimit: {
        from: number;
        to: number;
      };
    }[];
    paymentcode: string;
    paymentid: string;
  }[];
  depositLoading: false;
  depositResult: null;
  cancelDepositResult: null;
  depositUploadResult: null;
  addBankCardResult: null;
  deleteBankCardResult: null;
  addBillingResult: null;
  withdrawalResult: null;
  transferResult: null;
  withdrawalAllResult: null;
  balanceList: any[];
  bankCardList: any[];
  bankList: any[];
  withdrawalList: {
    banktype: string;
    channel: TransferChannel[];
  }[];
  mainBalance: number;
  mainSymbol: string;
  mainId: string;
  autotransfer: boolean;
  depositMinLimit: number;
  depositMaxLimit: number;
  withdrawalMinLimit: number;
  withdrawalMaxLimit: number;
}
