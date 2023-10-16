import { useCallback, useState } from "react";

export function useConfirmAdult() {
  const [isConfirmedAdult, setIsConfirmedAdult] = useState(false);

  const handleClickConfirmAdult = useCallback(() => {
    setIsConfirmedAdult((prevState) => !prevState);
  }, []);

  return {
    isConfirmedAdult,
    handleClickConfirmAdult,
  };
}
