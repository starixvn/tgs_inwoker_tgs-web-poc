export interface GameState {
  pending: boolean;
  kyGameList: any[];
  kyHotGameList: any[];
  homePageGameList: any[];
  providerList: Provider[];
  error: null | any;
  favGame: any[];
  containTransferWallet: boolean;
}

export interface Provider {
  abbreviation: string;
  balance: number;
  gpcode: string;
  name: string;
  status: number;
  transferwallet: boolean;
}
