// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { WalletState } from "@/types/stores/wallet";
import {
  GETWALLETBALANCE_BEGIN,
  GETWALLETEBALANCE_SUCCESS,
  GETWALLETBALANCE_FAILED,
  GETDEPOSITCHANNEL_BEGIN,
  GETDEPOSITCHANNEL_SUCCESS,
  GETDEPOSITCHANNEL_FAIL,
  DOMANUALDEPOSIT_BEGIN,
  DOMANUALDEPOSIT_SUCCESS,
  DOMANUALDEPOSIT_FAILED,
  DOMANUALDEPOSITUPLOAD_BEGIN,
  DOMANUALDEPOSITUPLOAD_SUCCESS,
  DOMANUALDEPOSITUPLOAD_FAIL,
  GETWITHDRAWALCHANNEL_BEGIN,
  GETWITHDRAWALCHANNEL_SUCCESS,
  GETWITHDRAWALCHANNEL_FAILED,
  GETBANKCARDLIST_BEGIN,
  GETBANKCARDLIST_SUCCESS,
  GETBANKCARDLIST_FAIL,
  DELETEBANKCARD_BEGIN,
  DELETEBANKCARD_SUCCESS,
  DELETEBANKCARD_FAIL,
  ADDBANKCARD_BEGIN,
  ADDBANKCARD_SUCCESS,
  ADDBANKCARD_FAIL,
  GETBALANCELIST_BEGIN,
  GETBALANCELIST_SUCCESS,
  GETBALANCELIST_FAIL,
  UPDATEBALANCELIST_BEGIN,
  UPDATEBALANCELIST_SUCCESS,
  UPDATEBALANCELIST_FAIL,
  CANCELDEPOSIT_BEGIN,
  CANCELDEPOSIT_SUCCESS,
  CANCELDEPOSIT_FAIL,
  DOWITHDRAWALALL_BEGIN,
  DOWITHDRAWALALL_SUCCESS,
  DOWITHDRAWALALL_FAIL,
  DOTRANSFER_BEGIN,
  DOTRANSFER_SUCCESS,
  DOTRANSFER_FAIL,
  GETGAMEBALANCE_BEGIN,
  GETGAMEBALANCE_SUCCESS,
  GETGAMEBALANCE_FAIL,
  ADDBILLING_BEGIN,
  ADDBILLING_SUCCESS,
  ADDBILLING_FAIL,
  DOLEEPAYDEPOSIT_BEGIN,
  DOLEEPAYDEPOSIT_SUCCESS,
  DOLEEPAYDEPOSIT_FAIL,
  DOUMPAYDEPOSIT_BEGIN,
  DOUMPAYDEPOSIT_SUCCESS,
  DOUMPAYDEPOSIT_FAIL,
  DOWITHDRAWAL_BEGIN,
  DOWITHDRAWAL_SUCCESS,
  DOWITHDRAWAL_FAIL,
  DOPRIMEPAYDEPOSIT_BEGIN,
  DOPRIMEPAYDEPOSIT_SUCCESS,
  DOPRIMEPAYDEPOSIT_FAIL,
  DOAPPLEPAYDEPOSIT_BEGIN,
  DOAPPLEPAYDEPOSIT_SUCCESS,
  DOAPPLEPAYDEPOSIT_FAIL,
  GETAUTOTRANSFER_BEGIN,
  GETAUTOTRANSFER_SUCCESS,
  GETAUTOTRANSFER_FAIL,
  UPDATEAUTOTRANSFER_BEGIN,
  UPDATEAUTOTRANSFER_SUCCESS,
  UPDATEAUTOTRANSFER_FAIL,
  DOTHIRDPARTYDEPOSIT_SUCCESS,
  DOTHIRDPARTYDEPOSIT_BEGIN,
  DOTHIRDPARTYDEPOSIT_FAIL,
  DOBANKDEPOSIT_BEGIN,
  DOBANKDEPOSIT_SUCCESS,
  DOBANKDEPOSIT_FAILED,
  DOCRYPTODEPOSIT_BEGIN,
  DOCRYPTODEPOSIT_SUCCESS,
  DOCRYPTODEPOSIT_FAILED,
  DODEPOSIT_BEGIN,
  DODEPOSIT_SUCCESS,
  DODEPOSIT_FAILED,
} from "@/api-services/constant/actionType";
import { WalletService } from "@/api-services/services/WalletService";
import { useCallback } from "react";
import { GetWalletBalanceResDto } from "@/models/dto/wallet/GetWalletBalanceResDto";
import { GetDepositMethodResDto } from "@/models/dto/wallet/GetDepositMethodResDto";
import { PerformManualBankDepositResDto } from "@/models/dto/wallet/PerformManualBankDepositResDto";
import { PerformManualFPSDepositResDto } from "@/models/dto/wallet/PerformManualFPSDepositResDto";
import { PerformManualThirdPartyDepositResDto } from "@/models/dto/wallet/PerformManualThirdPartyDepositResDto";
import { PerformUsdtDepositResDto } from "@/models/dto/wallet/PerformUsdtDepositResDto";
import { PerformPulsaDepositResDto } from "@/models/dto/wallet/PerformPulsaDepositResDto";
import { PerformEWalletDepositResDto } from "@/models/dto/wallet/PerformEWalletDepositResDto";
import { PerformLeePayDepositResDto } from "@/models/dto/wallet/PerformLeePayDepositResDto";
import { PerformManualFPSDepositWithNameResDto } from "@/models/dto/wallet/PerformManualFPSDepositWithNameResDto";
import { GetListOfWithdrawChannelResDto } from "@/models/dto/wallet/GetListOfWithdrawChannelResDto";
import { GetGameBalanceResDto } from "@/models/dto/game/GetGameBalanceResDto";
import { DoTransferResDto } from "@/models/dto/wallet/DoTransferResDto";
import { UpdateAutoTransferStatusResDto } from "@/models/dto/player/UpdateAutoTransferStatusResDto";

export function useWalletStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const wallet: WalletState = useSelector((state) => state.wallet);

  const getWalletBalance = useCallback(async () => {
    try {
      dispatch({
        type: GETWALLETBALANCE_BEGIN,
        loading: true,
      });

      const response =
        (await WalletService.GetWalletBalance()) as unknown as GetWalletBalanceResDto;
      //@ts-ignore
      if (response?.IsSuccess) {
        dispatch({
          type: GETWALLETEBALANCE_SUCCESS,
          payload: response,
          loading: true,
        });
      } else {
        dispatch({
          type: GETWALLETBALANCE_FAILED,
          payload: response,
          loading: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: GETWALLETBALANCE_FAILED,
        payload: error,
        loading: false,
      });
    }
  }, [dispatch]);

  const getDepositMethod = useCallback(async () => {
    try {
      dispatch({
        type: GETDEPOSITCHANNEL_BEGIN,
        loading: true,
      });

      const response =
        (await WalletService.GetDepositMethod()) as unknown as GetDepositMethodResDto;
      //@ts-ignore
      if (response?.IsSuccess) {
        dispatch({
          type: GETDEPOSITCHANNEL_SUCCESS,
          payload: response,
          loading: true,
        });
      } else {
        dispatch({
          type: GETDEPOSITCHANNEL_FAIL,
          payload: response,
          loading: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: GETDEPOSITCHANNEL_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, [dispatch]);

  const doBankDeposit = useCallback(
    async (
      name: string,
      account: string,
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string,
      note: string
    ) => {
      try {
        dispatch({
          type: DOMANUALDEPOSIT_BEGIN,
          loading: true,
        });

        //  @ts-ignore
        const response = (await WalletService.PerformManualBankDeposit(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype,
          note
        )) as PerformManualBankDepositResDto;
        //@ts-ignore
        if (response?.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOMANUALDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
        throw error; // Re-throw the error to indicate failure
      }
    },
    [dispatch]
  );

  const doFPSDeposit = useCallback(
    async (
      account: string,
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string
    ) => {
      try {
        dispatch({
          type: DOMANUALDEPOSIT_BEGIN,
          loading: true,
        });

        //  @ts-ignore
        const response = (await WalletService.PerformManualFPSDeposit(
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )) as PerformManualFPSDepositResDto;
        //@ts-ignore
        if (response?.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
      } catch (error: any) {
        dispatch({
          type: DOMANUALDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    [dispatch]
  );

  const doFPSDepositWithName = useCallback(
    async (
      name: string,
      account: string,
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string
    ) => {
      dispatch({
        type: DOMANUALDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await WalletService.PerformManualFPSDepositWithName(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )) as PerformManualFPSDepositWithNameResDto;
        //@ts-ignore
        if (response?.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOMANUALDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doThirdPartyDeposit = useCallback(
    async (
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string
    ) => {
      dispatch({
        type: DOTHIRDPARTYDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await WalletService.PerformManualThirdPartyDeposit(
          amount,
          paymentid,
          promotionid,
          banktype
        )) as PerformManualThirdPartyDepositResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: DOTHIRDPARTYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOTHIRDPARTYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      } catch (error: any) {
        dispatch({
          type: DOTHIRDPARTYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      }
    },
    [dispatch]
  );

  const doUsdtDeposit = useCallback(
    async (
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string
    ) => {
      dispatch({
        type: DODEPOSIT_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await WalletService.PerformUsdtDeposit(
          amount,
          paymentid,
          promotionid,
          banktype
        )) as PerformUsdtDepositResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: DODEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DODEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doPulsaDeposit = useCallback(
    async (
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string,
      note: string,
      phone: string
    ) => {
      dispatch({
        type: DODEPOSIT_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await WalletService.PerformPulsaDeposit(
          amount,
          paymentid,
          promotionid,
          banktype,
          note,
          phone
        )) as PerformPulsaDepositResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: DODEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DODEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doEWalletDeposit = useCallback(
    async (
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string,
      note: string,
      emoneyname: string,
      phone: string
    ) => {
      dispatch({
        type: DODEPOSIT_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await WalletService.PerformEWalletDeposit(
          amount,
          paymentid,
          promotionid,
          banktype,
          note,
          emoneyname,
          phone
        )) as PerformEWalletDepositResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: DODEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DODEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doLeePayDeposit = useCallback(
    async (amount: number, paymentid: string, promotionid: string) => {
      dispatch({
        type: DOLEEPAYDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await WalletService.PerformLeePayDeposit(
          amount,
          paymentid,
          promotionid
        )) as PerformLeePayDepositResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: DOLEEPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOLEEPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOLEEPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doUmPayBankDeposit = useCallback(
    async (amount: number, paymentid: string, promotionid: string) => {
      dispatch({
        type: DOUMPAYDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        const response = await WalletService.PerformUmPayBankDeposit(
          amount,
          paymentid,
          promotionid
        );

        if (response?.IsSuccess) {
          dispatch({
            type: DOUMPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOUMPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOUMPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );
  //-----------
  const doUmPayCryptoDeposit = useCallback(
    async (amount: number, paymentid: string, promotionid: string) => {
      dispatch({
        type: DOUMPAYDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        const response = await WalletService.PerformUmPayCrytoDeposit(
          amount,
          paymentid,
          promotionid
        );

        if (response?.IsSuccess) {
          dispatch({
            type: DOUMPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOUMPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOUMPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doPrimePayDeposit = useCallback(
    async (amount: number, paymentid: string, promotionid: string) => {
      dispatch({
        type: DOPRIMEPAYDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        const response = await WalletService.PerformPrimePayDeposit(
          amount,
          paymentid,
          promotionid
        );

        if (response?.IsSuccess) {
          dispatch({
            type: DOPRIMEPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOPRIMEPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOPRIMEPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doMaticPayDeposit = useCallback(
    async (amount: number, paymentid: string, promotionid: string) => {
      dispatch({
        type: DOBANKDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        const response = await WalletService.PerformMaticPayDeposit(
          amount,
          paymentid,
          promotionid
        );

        if (response?.IsSuccess) {
          dispatch({
            type: DOBANKDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOBANKDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doHelp2PayDeposit = useCallback(
    async (amount: number, paymentid: string, promotionid: string) => {
      dispatch({
        type: DOBANKDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        const response = await WalletService.PerformHelp2PayDeposit(
          amount,
          paymentid,
          promotionid
        );

        if (response?.IsSuccess) {
          dispatch({
            type: DOBANKDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOBANKDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doSkyPayDeposit = useCallback(
    async (amount: number, paymentid: string, promotionid: string) => {
      dispatch({
        type: DOBANKDEPOSIT_SUCCESS,
        loading: true,
      });

      try {
        const response = await WalletService.PerformSkyPayDeposit(
          amount,
          paymentid,
          promotionid
        );

        if (response?.IsSuccess) {
          dispatch({
            type: DOBANKDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOBANKDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doApplePayDeposit = useCallback(
    async (
      amount: number,
      paymentid: string,
      promotionid: string,
      transname: string
    ) => {
      dispatch({
        type: DOAPPLEPAYDEPOSIT_BEGIN,
        loading: true,
      });

      try {
        const response = await WalletService.PerformApplePayDeposit(
          amount,
          paymentid,
          promotionid,
          transname
        );

        if (response?.IsSuccess) {
          dispatch({
            type: DOAPPLEPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOAPPLEPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOAPPLEPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const doUploadDepositProof = useCallback(
    async (id: string, file: File, payload: any) => {
      dispatch({
        type: DOMANUALDEPOSITUPLOAD_BEGIN,
        loading: true,
      });

      try {
        const response = await WalletService.PerformUploadDepositProof(
          id,
          file
        );

        //@ts-ignore
        if (response?.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSITUPLOAD_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSITUPLOAD_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (error: any) {
        dispatch({
          type: DOMANUALDEPOSITUPLOAD_FAIL,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const getWithdrawalChannel = useCallback(async () => {
    dispatch({
      type: GETWITHDRAWALCHANNEL_BEGIN,
      loading: true,
    });

    try {
      const response =
        (await WalletService.GetListOfWithdrawChannel()) as unknown as GetListOfWithdrawChannelResDto;

      if (response?.IsSuccess) {
        dispatch({
          type: GETWITHDRAWALCHANNEL_SUCCESS,
          payload: response,
          loading: true,
        });
      } else {
        dispatch({
          type: GETWITHDRAWALCHANNEL_FAILED,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (error: any) {
      dispatch({
        type: GETWITHDRAWALCHANNEL_FAILED,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const getBankCardList = useCallback(() => {
    dispatch({
      type: GETBANKCARDLIST_BEGIN,
      loading: true,
    });

    return WalletService.GetBankCardList()
      .then((response) => {
        //@ts-ignore
        if (response?.IsSuccess) {
          dispatch({
            type: GETBANKCARDLIST_SUCCESS,
            //@ts-ignore
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETBANKCARDLIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETBANKCARDLIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });
  }, []);

  const initBankCard = useCallback(
    (channelid: string, bankType: string, address: string) => {
      dispatch({
        type: ADDBANKCARD_BEGIN,
        loading: true,
      });

      return WalletService.InitBankCard(channelid, bankType, address)
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: ADDBANKCARD_SUCCESS,
              payload: response,
              loading: false,
            });

            // AppHistory.push("/");
          } else {
            dispatch({
              type: ADDBANKCARD_FAIL,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((e) => {
          dispatch({
            type: ADDBANKCARD_FAIL,
            payload: { IsSuccess: false, info: e.status },
            loading: false,
          });
        });
    },
    []
  );

  const addBankCard = useCallback(
    (channelid: string, bankType: string, address: string) => {
      dispatch({
        type: ADDBANKCARD_BEGIN,
        loading: true,
      });

      return WalletService.AddBankCard(channelid, bankType, address)
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: ADDBANKCARD_SUCCESS,
              payload: response,
              loading: false,
            });

            // AppHistory.push("/");
          } else {
            dispatch({
              type: ADDBANKCARD_FAIL,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((e) => {
          dispatch({
            type: ADDBANKCARD_FAIL,
            payload: { IsSuccess: false, info: e.status },
            loading: false,
          });
        });
    },
    []
  );

  const deleteBankCard = useCallback((id: string) => {
    dispatch({
      type: DELETEBANKCARD_BEGIN,
      loading: true,
    });

    return WalletService.DeleteBankCard(id)
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: DELETEBANKCARD_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DELETEBANKCARD_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DELETEBANKCARD_FAIL,
          payload: e.status,
          loading: false,
        });
      });
  }, []);

  const getBalanceList = useCallback((loading = true) => {
    dispatch({
      type: GETBALANCELIST_BEGIN,
      loading: loading,
    });

    return WalletService.GetWalletBalance()
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: GETBALANCELIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETBALANCELIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETBALANCELIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });
  }, []);

  const updateBalanceList = useCallback(() => {
    dispatch({
      type: UPDATEBALANCELIST_BEGIN,
      loading: true,
    });

    //TODO: Replace with TGSWalletService when the issue resolved.
    return (
      WalletService.GetWalletBalance()
        // const result = WalletService.UpdateWalletDetails()
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: UPDATEBALANCELIST_SUCCESS,
              payload: response.data,
              loading: false,
            });

            // AppHistory.push("/");
          } else {
            dispatch({
              type: UPDATEBALANCELIST_FAIL,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((e) => {
          dispatch({
            type: UPDATEBALANCELIST_FAIL,
            payload: e.status,
            loading: false,
          });
        })
    );
  }, []);

  const cancelDeposit = useCallback((id: string) => {
    dispatch({
      type: CANCELDEPOSIT_BEGIN,
      loading: true,
    });

    return WalletService.CancelDeposit(id)
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: CANCELDEPOSIT_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: CANCELDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: CANCELDEPOSIT_FAIL,
          payload: e.status,
          loading: false,
        });
      });
  }, []);

  const doWithdrawAll = useCallback(() => {
    dispatch({
      type: DOWITHDRAWALALL_BEGIN,
      loading: true,
    });

    return WalletService.WithdrawAll()
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: DOWITHDRAWALALL_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOWITHDRAWALALL_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOWITHDRAWALALL_FAIL,
          payload: e.status,
          loading: false,
        });
      });
  }, []);

  const doTransfer = useCallback(async (gpcode: string, amount: number) => {
    try {
      dispatch({
        type: DOTRANSFER_BEGIN,
        loading: true,
      });

      const response = (await WalletService.Transfer(
        gpcode,
        amount
      )) as unknown as DoTransferResDto;

      if (response?.IsSuccess) {
        dispatch({
          type: DOTRANSFER_SUCCESS,
          payload: response,
          loading: false,
        });

        // AppHistory.push("/");
      } else {
        dispatch({
          type: DOTRANSFER_FAIL,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (error) {
      dispatch({
        type: DOTRANSFER_FAIL,
        payload: error.status,
        loading: false,
      });
    }
  }, []);

  const doWithdrawalFromGame = useCallback((gpcode: string, amount: number) => {
    dispatch({
      type: DOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.WithdrawalFromGame(gpcode, amount)
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: DOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  }, []);

  const performWithdrawFromEveryBrand = useCallback(() => {
    dispatch({
      type: DOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.WithdrawEverything()
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: DOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: DOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  }, []);

  const getGameBalance = useCallback(async (gpcode: string) => {
    dispatch({
      type: GETGAMEBALANCE_BEGIN,
      loading: true,
    });

    try {
      const response = (await WalletService.GetGameBalance(
        gpcode
      )) as unknown as GetGameBalanceResDto;

      if (response?.IsSuccess) {
        dispatch({
          type: GETGAMEBALANCE_SUCCESS,
          payload: response,
          gpcode: gpcode,
          loading: false,
        });
        // AppHistory.push("/");
      } else {
        dispatch({
          type: GETGAMEBALANCE_FAIL,
          payload: response,
          gpcode: gpcode,
          loading: false,
        });
      }

      return response;
    } catch (error: any) {
      dispatch({
        type: GETGAMEBALANCE_FAIL,
        payload: error.status,
        gpcode: gpcode,
        loading: false,
      });
    }
  }, []);

  const doBankDeposit2 = useCallback(
    (
      amount: number,
      paymentid: string,
      promotionid: string,
      paymentcode: string
    ) => {
      dispatch({
        type: DOBANKDEPOSIT_BEGIN,
        loading: true,
      });
      const result = WalletService.PerformBankDeposit(
        amount,
        paymentid,
        promotionid,
        paymentcode
      )
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: DOBANKDEPOSIT_SUCCESS,
              payload: response,
              loading: true,
            });
          } else {
            dispatch({
              type: DOBANKDEPOSIT_FAILED,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((error) => {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: error,
            loading: false,
          });
        });
      return result;
    },
    []
  );

  const doCryptoDeposit = useCallback(
    (
      amount: number,
      paymentid: string,
      promotionid: string,
      paymentcode: string
    ) => {
      dispatch({
        type: DOCRYPTODEPOSIT_BEGIN,
        loading: true,
      });
      const result = WalletService.PerformCryptoDeposit(
        amount,
        paymentid,
        promotionid,
        paymentcode
      )
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: DOCRYPTODEPOSIT_SUCCESS,
              payload: response,
              loading: true,
            });
          } else {
            dispatch({
              type: DOCRYPTODEPOSIT_FAILED,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((error) => {
          dispatch({
            type: DOCRYPTODEPOSIT_FAILED,
            payload: error,
            loading: false,
          });
        });
      return result;
    },
    []
  );

  const performDeposit = useCallback(
    (
      amount: number,
      paymentid: string,
      promotionid: string,
      paymentcode: string,
      type: string
    ) => {
      dispatch({
        type: DODEPOSIT_BEGIN,
        loading: true,
      });
      const result = WalletService.PerformDeposit(
        amount,
        paymentid,
        promotionid,
        paymentcode,
        type
      )
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: DODEPOSIT_SUCCESS,
              payload: response,
              loading: true,
            });
          } else {
            dispatch({
              type: DODEPOSIT_FAILED,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((error) => {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: error,
            loading: false,
          });
        });
      return result;
    },
    []
  );

  const addBilling = useCallback((card_id: string, amount: number) => {
    dispatch({
      type: ADDBILLING_BEGIN,
      loading: true,
    });
    const result = WalletService.AddBilling(card_id, amount)
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: ADDBILLING_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: ADDBILLING_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: ADDBILLING_FAIL,
          payload: { IsSuccess: false, info: e.status },
          loading: false,
        });
      });

    return result;
  }, []);

  const doWithdraw = useCallback(
    (amount: number, bankinfoid: string, paypassword: string, note: string) => {
      dispatch({
        type: DOWITHDRAWAL_BEGIN,
        loading: true,
      });
      const result = WalletService.DoWithdraw(
        amount,
        bankinfoid,
        paypassword,
        note
      )
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: DOWITHDRAWAL_SUCCESS,
              payload: response,
              loading: false,
            });

            // AppHistory.push("/");
          } else {
            dispatch({
              type: DOWITHDRAWAL_FAIL,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((e) => {
          dispatch({
            type: DOWITHDRAWAL_FAIL,
            payload: e.status,
            loading: false,
          });
        });

      return result;
    },
    []
  );

  const getAutoTransferStatus = useCallback(() => {
    dispatch({
      type: GETAUTOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.GetAutoTransferStatus()
      .then((response) => {
        if (response?.IsSuccess) {
          dispatch({
            type: GETAUTOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETAUTOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETAUTOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  }, []);

  const updateAutoTransferStatus = useCallback(async () => {
    try {
      dispatch({
        type: UPDATEAUTOTRANSFER_BEGIN,
        loading: true,
      });
      const response =
        (await WalletService.UpdateAutoTransferStatus()) as unknown as UpdateAutoTransferStatusResDto;
      if (response.IsSuccess) {
        dispatch({
          type: UPDATEAUTOTRANSFER_SUCCESS,
          payload: response,
          loading: true,
        });
      } else {
        dispatch({
          type: UPDATEAUTOTRANSFER_FAIL,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (error: any) {
      dispatch({
        type: UPDATEAUTOTRANSFER_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const doBankDepositWithDetail = useCallback(
    (
      name: string,
      account: string,
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string,
      detail: string,
      note: string
    ) => {
      dispatch({
        type: DOMANUALDEPOSIT_BEGIN,
        loading: true,
      });
      const result = WalletService.PerformManualBankDepositWithDetail(
        name,
        account,
        amount,
        paymentid,
        promotionid,
        banktype,
        detail,
        note
      )
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: DOMANUALDEPOSIT_SUCCESS,
              payload: response,
              loading: true,
            });
          } else {
            dispatch({
              type: DOMANUALDEPOSIT_FAILED,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((error) => {
          dispatch({
            type: DOMANUALDEPOSIT_FAILED,
            payload: error,
            loading: false,
          });
        });
      return result;
    },
    []
  );

  const doPulsaDepositWithDetail = useCallback(
    (
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string,
      note: string,
      detail: string,
      phone: string
    ) => {
      dispatch({
        type: DODEPOSIT_BEGIN,
        loading: true,
      });
      const result = WalletService.PerformPulsaDepositWithDetail(
        amount,
        paymentid,
        promotionid,
        banktype,
        note,
        detail,
        phone
      )
        .then((response) => {
          if (response?.IsSuccess) {
            dispatch({
              type: DODEPOSIT_SUCCESS,
              payload: response,
              loading: true,
            });
          } else {
            dispatch({
              type: DODEPOSIT_FAILED,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((error) => {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: error,
            loading: false,
          });
        });
      return result;
    },
    []
  );

  const doEWalletDepositWithDetail = useCallback(
    (
      amount: number,
      paymentid: string,
      promotionid: string,
      banktype: string,
      note: string,
      detail: string,
      emoneyname: string,
      phone: string
    ) => {
      dispatch({
        type: DODEPOSIT_BEGIN,
        loading: true,
      });
      const result = WalletService.PerformEWalletDepositWithDetail(
        amount,
        paymentid,
        promotionid,
        banktype,
        note,
        detail,
        emoneyname,
        phone
      )
        .then((response) => {
          //@ts-ignore
          if (response?.IsSuccess) {
            dispatch({
              type: DODEPOSIT_SUCCESS,
              payload: response,
              loading: true,
            });
          } else {
            dispatch({
              type: DODEPOSIT_FAILED,
              payload: response,
              loading: false,
            });
          }
          return response;
        })
        .catch((error) => {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: error,
            loading: false,
          });
        });
      return result;
    },
    []
  );

  return {
    wallet,
    getWalletBalance,
    getDepositMethod,
    doUploadDepositProof,
    getWithdrawalChannel,
    doLeePayDeposit,
    doPrimePayDeposit,
    doMaticPayDeposit,
    doApplePayDeposit,
    getBankCardList,
    initBankCard,
    addBankCard,
    deleteBankCard,
    getBalanceList,
    updateBalanceList,
    cancelDeposit,
    doWithdrawAll,
    doTransfer,
    doWithdrawalFromGame,
    getGameBalance,
    addBilling,
    doWithdraw,
    getAutoTransferStatus,
    updateAutoTransferStatus,
    doUmPayCryptoDeposit,
    doUmPayBankDeposit,
    doFPSDeposit,
    doFPSDepositWithName,
    doThirdPartyDeposit,
    doBankDeposit,
    doHelp2PayDeposit,
    doSkyPayDeposit,
    doBankDeposit2,
    doCryptoDeposit,
    performDeposit,
    doUsdtDeposit,
    doPulsaDeposit,
    doEWalletDeposit,
    performWithdrawFromEveryBrand,
    doBankDepositWithDetail,
    doPulsaDepositWithDetail,
    doEWalletDepositWithDetail,
  };
}
