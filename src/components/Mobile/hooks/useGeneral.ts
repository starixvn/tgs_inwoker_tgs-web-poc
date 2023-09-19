import { useDispatch, useSelector } from "react-redux";
import { GeneralState } from "@/types/general";
import { generalAction } from "@/api-services/actions/generalAction";
import { GetBrandAllAgentResDto } from "@/models/dto/general/GetBrandAllAgentResDto";

export function useGeneral() {
  const dispatch = useDispatch();
  //@ts-ignore
  const general: GeneralState = useSelector((state) => state.general);

  const getBrandAllAgent = async () => {
    //@ts-ignore
    return dispatch(
      generalAction.getBrandAllAgent()
    ) as Promise<GetBrandAllAgentResDto>;
  };
  return {
    general,
    getBrandAllAgent,
  };
}
