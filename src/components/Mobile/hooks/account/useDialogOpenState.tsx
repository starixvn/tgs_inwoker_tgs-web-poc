import { useCallback, useMemo, useState } from "react";

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

  const handleToggleDialog = useCallback((dialogKey?: string) => {
    const newDialogOpenState = { ...initialDialogOpenState };

    if (dialogKey) {
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
