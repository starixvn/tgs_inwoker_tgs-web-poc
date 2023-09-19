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
  UPDATECARDNO_BEGIN,
  UPDATECARDNO_FAILURE,
  UPDATECARDNO_SUCCESS,
} from "@/api-services/constant/actionType";
import { AccountService } from "@/api-services/services/AccountService";

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
        const response = await AccountService.AddRealName(name, number);

        if (response.IsSuccess) {
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
      } catch (e) {
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
        const response = await AccountService.Login(username, password);

        if (response.IsSuccess) {
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
      } catch (e) {
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
    const response = await AccountService.Logout();

    if (response.IsSuccess) {
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
    const response = await AccountService.GetMemberInfo();

    if (response.IsSuccess) {
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

  const getAccountInfo = useCallback(() => {
    dispatch({
      type: GETACCOUNT_BEGIN,
      loading: true,
    });
    const result = AccountService.GetMemberInfo()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETACCOUNT_SUCCESS,
            payload: response,
            loading: true,
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
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  }, []);

  const getAccountProfile = useCallback((showVip: boolean) => {
    const result = AccountService.GetMemberInfo()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: showVip === true ? GETACCOUNT_SUCCESS : GETBALANCE_SUCCESS,
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
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  }, []);

  const registerAccount = useCallback(
    async (
      username: string,
      pwd: string,
      confirmpwd: string,
      invitationcode = "",
      upper: string
    ) => {
      const result = await AccountService.Register(
        username,
        pwd,
        confirmpwd,
        invitationcode,
        upper
      )
        .then((response) => {
          if (response.IsSuccess) {
          }
          return response;
        })
        .catch((error) => {
          dispatch({
            type: GETACCOUNT_FAILURE,
            payload: error,
            loading: false,
          });
        });
      return result;
    },
    []
  );

  const getIDCardNo = useCallback(() => {
    dispatch({
      type: GETIDCARDNO_BEGIN,
      loading: true,
    });
    var result = AccountService.GetIDCardNo();
    result
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETIDCARDNO_SUCCESS,
            payload: response,
            loading: true,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETIDCARDNO_FAILURE,
            payload: response,
            loading: false,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GETIDCARDNO_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  }, []);

  const getPromoteUserList = useCallback((limit: number, page: number) => {
    var result = AccountService.GetPromoteUser(page, limit);
    result.then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOTEUSER_SUCCESS,
          payload: response,
          isNew: page === 0,
        });
      }
    });
    return result;
  }, []);

  const getPromoteBillList = useCallback((limit: number, page: number) => {
    var result = AccountService.GetPromoteBill(page, limit);
    result.then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOTEBILL_SUCCESS,
          payload: response,
          isNew: page === 0,
        });
      }
    });
    return result;
  }, []);

  const GetRegisterStatus = useCallback(async () => {
    const result = await AccountService.GetRegisterStatus()
      .then((response) => {
        if (response.IsSuccess) {
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  }, []);

  const newRegister = useCallback(async (type: string, input: any) => {
    const result = await AccountService.NewRegister(type, input)
      .then((response) => {
        if (response.IsSuccess) {
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  }, []);

  const performUpdateMemberNameAndIC = useCallback(
    (name: string, number: string, file: File) => {
      dispatch({
        type: UPDATECARDNO_BEGIN,
        loading: true,
      });
      const result = AccountService.UpdateMemberNameAndIC(name, number, file)
        .then((response) => {
          if (response.IsSuccess) {
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
        })
        .catch((e) => {
          dispatch({
            type: UPDATECARDNO_FAILURE,
            payload: e.status,
            loading: false,
          });
        });

      return result;
    },
    []
  );

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
  };
}
