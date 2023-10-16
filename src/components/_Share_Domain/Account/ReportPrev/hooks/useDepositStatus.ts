import { useEffect, useState } from "react";
import { ReportService } from "@/services/ReportService";
import { WithdrawalStatusDictionary } from "@/models/dto/report/GetWithdrawalStatusResDto";

export function useDepositStatus() {
  const [statusDictionary, setStatusDictionary] =
    useState<WithdrawalStatusDictionary>({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    ReportService.GetDepositStatus().then((response) => {
      if (response.IsSuccess) {
        setStatusDictionary(response.data);
      }
    });
  }, []);

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  return {
    statusDictionary,
    status,
    handleStatusChange,
  };
}
