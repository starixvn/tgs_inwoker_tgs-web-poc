interface TransactionLogViewModel {
  amount: number;
  id: string;
  recordedon: string;
  type: string | null;
}

interface TransactionLogViewModelPagingResponse {
  items: (TransactionLogViewModel | null)[];
  totalCount: number;
}

export interface GetBalanceChangesResDto {
  IsSuccess: boolean;
  code: number;
  data: TransactionLogViewModelPagingResponse;
  info: string | null;
}
