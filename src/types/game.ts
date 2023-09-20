export interface GameState {
  pending: boolean;
  kyGameList: any[];
  kyHotGameList: any[];
  homePageGameList: any[];
  providerList: any[];
  error: null | any;
  favGame: any[];
  containTransferWallet: boolean;
}
