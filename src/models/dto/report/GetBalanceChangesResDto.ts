export interface TransactionLogViewModel {
  amount: number;
  id: string;
  recordedon: string;
  type: string | null;
}

export interface TransactionLogViewModelPagingResponse {
  items: TransactionLogViewModel[];
  totalCount: number;
}

export interface GetBalanceChangesResDto {
  IsSuccess: boolean;
  code: number;
  data: TransactionLogViewModelPagingResponse;
  info: string | null;
}
