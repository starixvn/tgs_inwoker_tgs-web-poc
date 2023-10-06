import { FlowState } from "@/models/dto/report/GetWithdrawalDetailsResDto";

interface DepositFormViewModel {
  id: string;
  status: FlowState | null;
  amount: number | null;
  brandpaymentid: string | null;
  createdon: string;
  updatedon: string | null;
  canuploadcerts: boolean;
  orderno: string | null;
}

interface DepositFormViewModelPagedResponse {
  errors: (string | null)[];
  message: string;
  valid: boolean;
  items: (DepositFormViewModel | null)[];
  totalCount: number | null;
}

export interface GetDepositDetailsResDto {
  IsSuccess: boolean;
  code: number;
  data: DepositFormViewModelPagedResponse;
  info: string | null;
}
