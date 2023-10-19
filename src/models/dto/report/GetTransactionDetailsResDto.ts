export interface TransactionDetail {
  id: string;
  externalRoundId: string;
  gameId: number | null;
  gameName: string;
  gameProviderId: string;
  gameProviderCode: string;
  gameProviderName: string;
  subGameProviderName: string;
  playerName: string;
  playerCode: string;
  externalPlayerCode: string;
  currencyCode: string;
  platformType: number | null;
  status: number | null;
  createdOn: string;
  closedOn: string;
  updatedOn: string | null;
  externalCreatedOn: string;
  externalClosedOn: string | null;
  betAmount: number | null;
  validBetAmount: number | null;
  turnover: number | null;
  settleAmount: number | null;
  commission: number | null;
  winLoss: number | null;
  tieBetAdjustment: number | null;
  additionalData: string | null;
  originalTurnover: number | null;
  effectiveBettingPercentage: number | null;
}

export interface GetTransactionDetailsResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    items: TransactionDetail[];
    totalcount: number | null;
  };
  info: string | null;
}
