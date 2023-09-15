import { useSelector } from "react-redux";

export function useGeneral() {
  //@ts-ignore
  const general = useSelector((state) => state.general);

  return {
    general,
  };
}
