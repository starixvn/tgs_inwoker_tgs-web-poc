import { useCallback, useMemo, useState } from "react";
import { NavCardKey } from "@/hooks/account/useAccountNavigations";

export function useDialogOpenState<T>(dictionary: { [key in string]: T }) {
  const initialDialogOpenState = useMemo(() => {
    return getInitialDialogOpenState<T>(dictionary);
  }, [dictionary]);

  /*
   * {
   *   name: true,
   *   email: false,
   *   qq: false
   * }
   */
  const [dialogOpenState, setDialogOpenState] = useState(
    initialDialogOpenState
  );

  const handleToggleDialog = useCallback((dialogKey?: any) => {
    const newDialogOpenState = { ...initialDialogOpenState };

    if (typeof dialogKey !== "undefined") {
      newDialogOpenState[dialogKey] = !initialDialogOpenState[dialogKey]!;
    }
    setDialogOpenState(newDialogOpenState);
  }, []);

  return {
    dialogOpenState,
    handleToggleDialog,
  };
}

function getInitialDialogOpenState<T>(dictionary: {
  [key in string]: T;
}) {
  const initState: { [key in string]: boolean } = {};
  Object.keys(dictionary).forEach((profileItemKey) => {
    initState[profileItemKey] = false;
  });

  return initState;
}
