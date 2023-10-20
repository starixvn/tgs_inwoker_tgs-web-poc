export interface WithdrawFormViewModel {
  id: string;
  status: FlowState | null;
  amount: number | null;
  brandpaymentid: string | null;
  createdon: string;
  updatedon: string | null;
  orderno: string | null;
}

export enum FlowState {
  Unknown = 0,
  WaitingPayment = 1,
  Review = 2,
  Approved = 3,
  Rejected = 4,
  WaitingPaid = 5,
  Paid = 6,
}

interface WithdrawFormViewModelPagedResponse {
  errors: (string | null)[];
  message: string;
  valid: boolean;
  items: WithdrawFormViewModel[];
  totalCount: number | null;
}

export interface GetWithdrawalDetailsResDto {
  IsSuccess: boolean;
  code: number;
  data: WithdrawFormViewModelPagedResponse;
  info: string | null;
}
