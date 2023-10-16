import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  GETMESSAGE_BEGIN,
  GETMESSAGE_FAILED,
  GETMESSAGE_SUCCESS,
  SETMESSAGEREAD_BEGIN,
  SETMESSAGEREAD_FAILED,
  SETMESSAGEREAD_SUCCESS,
} from "@/api-services/constant/actionType";
import { InboxService } from "@/api-services/services/InboxService";
import { InboxListResDto } from "@/models/dto/inbox/InboxListResDto";
import { UpdateReadMessageResDto } from "@/models/dto/inbox/UpdateReadMessageResDto";

export function useInboxStore() {
  const dispatch = useDispatch();

  const getMessages = useCallback(
    async (
      language: string,
      pages: number,
      limit: number,
      isNew = true,
      getCount = false
    ) => {
      try {
        dispatch({
          type: GETMESSAGE_BEGIN,
          loading: true,
        });
        const response = (await InboxService.InboxList(
          language,
          pages,
          limit
        )) as unknown as InboxListResDto;
        if (response?.IsSuccess) {
          dispatch({
            type: GETMESSAGE_SUCCESS,
            payload: response,
            loading: true,
            isNew: isNew,
            getCount: getCount,
          });
        } else {
          dispatch({
            type: GETMESSAGE_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: GETMESSAGE_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    [dispatch]
  );

  const setMessageRead = useCallback(
    async (ids: string[]) => {
      dispatch({
        type: SETMESSAGEREAD_BEGIN,
        loading: true,
      });
      try {
        const response = (await InboxService.UpdateReadMessage(
          ids
        )) as unknown as UpdateReadMessageResDto;
        if (response.IsSuccess) {
          dispatch({
            type: SETMESSAGEREAD_SUCCESS,
            payload: response,
            loading: true,
            ids: ids,
          });
        } else {
          dispatch({
            type: SETMESSAGEREAD_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      } catch (error: any) {
        dispatch({
          type: SETMESSAGEREAD_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    [dispatch]
  );

  return {
    getMessages,
    setMessageRead,
  };
}
