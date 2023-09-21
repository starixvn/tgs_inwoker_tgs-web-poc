import { useDispatch, useSelector } from "react-redux";
import { AccountState } from "@/types/account";
import { useCallback } from "react";
import {
  CHECKTOKEN_BEGIN,
  CHECKTOKEN_FAILURE,
  CHECKTOKEN_SUCCESS,
  GETACCOUNT_BEGIN,
  GETACCOUNT_FAILURE,
  GETACCOUNT_SUCCESS,
  GETBALANCE_SUCCESS,
  GETIDCARDNO_BEGIN,
  GETIDCARDNO_FAILURE,
  GETIDCARDNO_SUCCESS,
  GETPROMOTEBILL_SUCCESS,
  GETPROMOTEUSER_SUCCESS,
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_BEGIN,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  RESET_ACCOUNTRESULT,
  UPDATECARDNO_BEGIN,
  UPDATECARDNO_FAILURE,
  UPDATECARDNO_SUCCESS,
} from "@/api-services/constant/actionType";
import { AccountService } from "@/api-services/services/AccountService";
import { GetMemberInfoResDto } from "@/models/dto/player/GetMemberInfoResDto";
import { AddRealNameResDto } from "@/models/dto/player/AddRealNameResDto";
import { LoginResDto } from "@/models/dto/player/LoginResDto";
import { GetIDCardNoResDto } from "@/models/dto/pc/GetIDCardNoResDto";
import { GetPromoteUserResDto } from "@/models/dto/pc/GetPromoteUserResDto";
import { LogoutResDto } from "@/models/dto/player/LooutResDto";
import { GetPromoteBillResDto } from "@/models/dto/pc/GetPromoteBillResDto";
import { UpdateMemberNameAndICResDto } from "@/models/dto/player/UpdateMemberNameAndICResDto";
import { NewRegisterResDto } from "@/models/dto/player/NewRegisterResDto";
import { GetRegisterStatusResDto } from "@/models/dto/player/GetRegisterStatusResDto";
import { RegisterResDto } from "@/models/dto/player/RegisterResDto";

export function useAccountStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const account: AccountState = useSelector((state) => state.account);

  // Action Creators
  const updateMemberCardNo = useCallback(
    async (name: string, number: string) => {
      dispatch({
        type: UPDATECARDNO_BEGIN,
        loading: true,
      });
      try {
        const response = (await AccountService.AddRealName(
          name,
          number
        )) as unknown as AddRealNameResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: UPDATECARDNO_SUCCESS,
            payload: {
              IsSuccess: true,
              member_name: name,
              check_pass_account: true,
            },
            loading: false,
          });
        } else {
          dispatch({
            type: UPDATECARDNO_FAILURE,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (e: any) {
        dispatch({
          type: UPDATECARDNO_FAILURE,
          payload: e.status,
          loading: false,
        });
      }
    },
    []
  );

  const accountLogin = useCallback(
    async (username: string, password: string) => {
      dispatch({
        type: LOGIN_BEGIN,
        loading: true,
      });
      try {
        const response = (await AccountService.Login(
          username,
          password
        )) as unknown as LoginResDto;
        if (response?.IsSuccess) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (e: any) {
        dispatch({
          type: UPDATECARDNO_FAILURE,
          payload: e.status,
          loading: false,
        });
      }
    },
    []
  );

  const accountLogout = useCallback(async (token: string) => {
    dispatch({
      type: LOGOUT_BEGIN,
      loading: true,
    });
    const response = (await AccountService.Logout()) as unknown as LogoutResDto;

    if (response?.IsSuccess) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: response,
        loading: false,
      });
    } else {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: response,
        loading: false,
      });
    }

    return response;
  }, []);

  const checkTokenIsValid = useCallback(async () => {
    dispatch({
      type: CHECKTOKEN_BEGIN,
      loading: true,
    });
    const response =
      (await AccountService.GetMemberInfo()) as unknown as GetMemberInfoResDto;

    if (response?.IsSuccess) {
      dispatch({
        type: CHECKTOKEN_SUCCESS,
        payload: response,
        loading: false,
      });
    } else {
      localStorage.removeItem("token");

      dispatch({
        type: CHECKTOKEN_FAILURE,
        payload: response,
        loading: false,
      });
    }
    return response;
  }, []);

  const getAccountInfo = useCallback(async () => {
    dispatch({
      type: GETACCOUNT_BEGIN,
      loading: true,
    });
    try {
      // @ts-ignore
      const result =
        (await AccountService.GetMemberInfo()) as unknown as GetMemberInfoResDto;
      if (result.IsSuccess) {
        dispatch({
          type: GETACCOUNT_SUCCESS,
          payload: result,
          loading: true,
        });

        // AppHistory.push("/");
      } else {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: result,
          loading: false,
        });
      }

      return result;
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const getAccountProfile = useCallback(async (showVip: boolean) => {
    try {
      const response =
        (await AccountService.GetMemberInfo()) as unknown as GetMemberInfoResDto;
      if (response?.IsSuccess) {
        dispatch({
          type: showVip ? GETACCOUNT_SUCCESS : GETBALANCE_SUCCESS,
          payload: response,
          loading: false,
        });

        // AppHistory.push("/");
      } else {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
      throw e;
    }
  }, []);

  const registerAccount = useCallback(
    async (
      username: string,
      pwd: string,
      confirmpwd: string,
      invitationcode = "",
      upper: string
    ) => {
      try {
        return (await AccountService.Register(
          username,
          pwd,
          confirmpwd,
          invitationcode,
          upper
        )) as unknown as RegisterResDto;
      } catch (e: any) {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: e,
          loading: false,
        });
      }
    },
    []
  );

  const getIDCardNo = useCallback(async () => {
    dispatch({
      type: GETIDCARDNO_BEGIN,
      loading: true,
    });
    try {
      const result =
        (await AccountService.GetIDCardNo()) as unknown as GetIDCardNoResDto;
      if (result.IsSuccess) {
        dispatch({
          type: GETIDCARDNO_SUCCESS,
          payload: result,
          loading: true,
        });

        // AppHistory.push("/");
      } else {
        dispatch({
          type: GETIDCARDNO_FAILURE,
          payload: result,
          loading: false,
        });
      }

      return result;
    } catch (e: any) {
      dispatch({
        type: GETIDCARDNO_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const getPromoteUserList = useCallback((limit: number, page: number) => {
    var result = AccountService.GetPromoteUser(
      page,
      limit
    ) as unknown as GetPromoteUserResDto;

    if (result.IsSuccess) {
      dispatch({
        type: GETPROMOTEUSER_SUCCESS,
        payload: result,
        isNew: page === 0,
      });
      return result;
    }
  }, []);

  const getPromoteBillList = useCallback(
    async (limit: number, page: number) => {
      const result = (await AccountService.GetPromoteBill(
        page,
        limit
      )) as unknown as GetPromoteBillResDto;

      if (result.IsSuccess) {
        dispatch({
          type: GETPROMOTEBILL_SUCCESS,
          payload: result,
          isNew: page === 0,
        });
      }

      return result;
    },
    []
  );

  const GetRegisterStatus = useCallback(async () => {
    try {
      return (await AccountService.GetRegisterStatus()) as unknown as GetRegisterStatusResDto;
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const newRegister = useCallback(async (type: string, input: any) => {
    try {
      return (await AccountService.NewRegister(
        type,
        input
      )) as unknown as NewRegisterResDto;
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const performUpdateMemberNameAndIC = useCallback(
    async (name: string, number: string, file: File) => {
      dispatch({
        type: UPDATECARDNO_BEGIN,
        loading: true,
      });
      try {
        const result = (await AccountService.UpdateMemberNameAndIC(
          name,
          number,
          file
        )) as unknown as UpdateMemberNameAndICResDto;

        if (result.IsSuccess) {
          dispatch({
            type: UPDATECARDNO_SUCCESS,
            payload: {
              IsSuccess: true,
              member_name: name,
              check_pass_account: true,
            },
            loading: false,
          });
        } else {
          dispatch({
            type: UPDATECARDNO_FAILURE,
            payload: result,
            loading: false,
          });
        }
        return result;
      } catch (e: any) {
        dispatch({
          type: UPDATECARDNO_FAILURE,
          payload: e.status,
          loading: false,
        });
      }
    },
    []
  );

  const resetAccountResult = useCallback(() => {
    dispatch({
      type: RESET_ACCOUNTRESULT,
    });
  }, []);

  return {
    account,
    updateMemberCardNo,
    accountLogin,
    accountLogout,
    checkTokenIsValid,
    getAccountInfo,
    getAccountProfile,
    registerAccount,
    getIDCardNo,
    getPromoteUserList,
    getPromoteBillList,
    GetRegisterStatus,
    newRegister,
    performUpdateMemberNameAndIC,
    resetAccountResult,
  };
}
