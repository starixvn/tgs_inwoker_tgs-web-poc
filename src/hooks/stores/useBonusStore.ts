import { useDispatch, useSelector } from "react-redux";
import { BonusService } from "@/api-services/services/BonusService";
import {
  BONUSNEW_BEGIN,
  BONUSNEW_FAILURE,
  BONUSNEW_SUCCESS,
} from "@/api-services/constant/actionType";
import { BonusState } from "@/types/stores/bonus";

/*
 * LIYI:
 * It looks like a pull-out store from general, but still work in press
 * there's no place using state.bonus in this repo
 * */
export function useBonusStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const bonus: BonusState = useSelector((state) => state.bonus);

  const getNewBonusList = async (token: string) => {
    dispatch({
      type: BONUSNEW_BEGIN,
      loading: true,
    });

    try {
      const response = (await BonusService.AvailableList(token)) as any;

      if (response?.IsSuccess) {
        dispatch({
          type: BONUSNEW_SUCCESS,
          payload: response,
          loading: false,
        });

        // AppHistory.push("/");
      } else {
        dispatch({
          type: BONUSNEW_FAILURE,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (error: any) {
      dispatch({
        type: BONUSNEW_FAILURE,
        payload: error,
        loading: false,
      });
    }
  };

  return {
    bonus,
    getNewBonusList,
  };
}
