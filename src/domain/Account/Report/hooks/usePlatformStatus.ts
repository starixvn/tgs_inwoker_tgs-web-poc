import { useEffect, useState } from "react";
import { ReportService } from "@/services/ReportService";

export interface PlatformStatusDictionary {
  [key: string]: string | null;
}

// TODO: no platform status found
export function usePlatformStatus() {
  const [statusDictionary, setStatusDictionary] =
    useState<PlatformStatusDictionary>({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    // ReportService.GetDepositStatus().then((response) => {
    //   if (response.IsSuccess) {
    //     setStatusDictionary(response.data);
    //   }
    // });
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
