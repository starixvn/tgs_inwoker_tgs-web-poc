import { useDispatch, useSelector } from "react-redux";
import { UiState } from "@/types/ui";
import {
  GETANNOUNCEMENT_BEGIN,
  GETANNOUNCEMENT_FAIL,
  GETANNOUNCEMENT_SUCCESS,
  GETMARQUEE_BEGIN,
  GETMARQUEE_FAIL,
  GETMARQUEE_SUCCESS,
} from "@/api-services/constant/actionType";
import { UiService } from "@/api-services/services/UiService";
import { GetMarqueeResDto } from "@/models/dto/ui/GetMarqueeResDto";

export function useUiStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const ui: UiState = useSelector((state) => state.ui);

  const getMarquee = async (language: string) => {
    return async (dispatch) => {
      dispatch({
        type: GETMARQUEE_BEGIN,
        loading: true,
      });

      try {
        const response = (await UiService.GetMarquee(
          language
        )) as GetMarqueeResDto;

        if (response.IsSuccess) {
          dispatch({
            type: GETMARQUEE_SUCCESS,
            payload: response.data,
            loading: false,
          });
        }
      } catch (e) {
        dispatch({
          type: GETMARQUEE_FAIL,
          loading: false,
        });
      }
    };
  };

  const getAnnouncement = async (language: string) => {
    return async (dispatch) => {
      dispatch({
        type: GETANNOUNCEMENT_BEGIN,
        loading: true,
      });

      try {
        const response = (await UiService.GetMarquee(
          language
        )) as GetMarqueeResDto;

        if (response.IsSuccess) {
          dispatch({
            type: GETANNOUNCEMENT_SUCCESS,
            payload: response.data,
            loading: false,
          });
        }
      } catch (e) {
        dispatch({
          type: GETANNOUNCEMENT_FAIL,
          loading: false,
        });
      }
    };
  };

  return {
    ui,
    getMarquee,
    getAnnouncement,
  };
}
