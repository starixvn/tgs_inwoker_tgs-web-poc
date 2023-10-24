import { useEffect, useState } from "react";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

export function useTokenVerify() {
  const { checkTokenIsValid } = useAccountStore();
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  const restoreToken = async () => {
    await checkTokenIsValid();
    setIsTokenVerified(true);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return {
    isTokenVerified,
  };
}
