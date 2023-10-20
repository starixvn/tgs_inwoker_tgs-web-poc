export interface GameBalanceInfosViewModel {
  amount: number | null;
  balancetime: string;
  from: string | null;
  to: string | null;
}

interface GameBalanceInfosViewModelPagedResponse {
  errors: (string | null)[];
  message: string;
  valid: boolean;
  items: GameBalanceInfosViewModel[];
  totalCount: number | null;
}

export interface GetTransferReportResDto {
  IsSuccess: boolean;
  code: number;
  data: GameBalanceInfosViewModelPagedResponse;
  info: string | null;
}
