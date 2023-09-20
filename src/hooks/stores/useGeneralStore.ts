import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeneralState } from "@/types/general";
import {
  COMPOSEMEMO_BEGIN,
  COMPOSEMEMO_FAIL,
  COMPOSEMEMO_SUCCESS,
  DELIVERYBOX_BEGIN,
  DELIVERYBOX_FAIL,
  DELIVERYBOX_SUCCESS,
  GETAFFILIATESTATUS_FAIL,
  GETAFFILIATESTATUS_SUCCESS,
  GETBANNER_BEGIN,
  GETBANNER_FAIL,
  GETBANNER_SUCCESS,
  GETBRAND_FAIL,
  GETBRAND_SUCCESS,
  GETBRANDALLAGENT_FAIL,
  GETBRANDALLAGENT_SUCCESS,
  GETBRANDCOMMUNICATION_BEGIN,
  GETBRANDCOMMUNICATION_FAIL,
  GETBRANDCOMMUNICATION_SUCCESS,
  GETBRANDLANGUAGE_BEGIN,
  GETBRANDLANGUAGE_FAIL,
  GETBRANDLANGUAGE_SUCCESS,
  GETINVITATIONCODE_FAILED,
  GETINVITATIONCODE_SUCCESS,
  GETLIVECHATURL_BEGIN,
  GETLIVECHATURL_FAIL,
  GETLIVECHATURL_SUCCESS,
  GETMEMOV2_BEGIN,
  GETMEMOV2_FAIL,
  GETMEMOV2_SUCCESS,
  GETPLAYERPROMOLIST_BEGIN,
  GETPLAYERPROMOLIST_FAILURE,
  GETPLAYERPROMOLIST_SUCCESS,
  GETPROMOLIST_BEGIN,
  GETPROMOLIST_FAILURE,
  GETPROMOLIST_SUCCESS,
  GETPROMOROULETTE_RESULT_BEGIN,
  GETPROMOROULETTE_RESULT_FAILED,
  GETPROMOROULETTE_RESULT_SUCCESS,
  GETPROMOROULETTE_STATUS_BEGIN,
  GETPROMOROULETTE_STATUS_FAILED,
  GETPROMOROULETTE_STATUS_SUCCESS,
  GETPROMOTION_BEGIN,
  GETPROMOTION_FAILURE,
  GETPROMOTION_SUCCESS,
  GETROULETTE_COUNT_BEGIN,
  GETROULETTE_COUNT_FAILED,
  GETROULETTE_COUNT_SUCCESS,
  GETSITETOKEN_FAIL,
  GETSITETOKEN_SUCCESS,
  GETVIP_BEGIN,
  GETVIP_FAILED,
  GETVIP_SUCCESS,
  JOINPROMO_BEGIN,
  JOINPROMO_FAILURE,
  JOINPROMO_SUCCESS,
  READMEMO_BEGIN,
  READMEMO_FAIL,
  READMEMO_SUCCESS,
  REPLYMEMO_BEGIN,
  REPLYMEMO_FAIL,
  REPLYMEMO_SUCCESS,
} from "@/api-services/constant/actionType";
import { GeneralService } from "@/api-services/services/GeneralService";

export function useGeneralStore() {
  const dispatch = useDispatch();
  //@ts-ignore
  const general: GeneralState = useSelector((state) => state.general);

  const getSiteToken = useCallback(async () => {
    try {
      const response = await GeneralService.GetSiteToken();
      if (response.IsSuccess) {
        dispatch({
          type: GETSITETOKEN_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GETSITETOKEN_FAIL,
          payload: response.data,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: GETSITETOKEN_FAIL,
        payload: error.data,
      });
      return error;
    }
  }, []);

  const getBrand = useCallback(async () => {
    try {
      const response = await GeneralService.GetBrand();
      if (response.IsSuccess) {
        dispatch({
          type: GETBRAND_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETBRAND_FAIL,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: GETBRAND_FAIL,
        payload: error,
      });
      return error;
    }
  }, []);

  const getMobilePrefix = useCallback(async () => {
    // TODO:GeneralService.GetMobilePrefix is not defined
    // try {
    //   const response = await GeneralService.GetMobilePrefix();
    //   if (response.IsSuccess) {
    //     dispatch({
    //       type: GETMOBILEPREFIX_SUCCESS,
    //       payload: response.data,
    //     });
    //   }
    //   return response;
    // } catch (error) {
    //   return error;
    // }
  }, []);

  const getPromotionList = useCallback(
    async (language, page, rows, desc, sort, all) => {
      dispatch({
        type: GETPROMOLIST_BEGIN,
        loading: true,
      });

      try {
        const response = await GeneralService.GetPromotionList(
          language,
          page,
          rows,
          desc,
          sort,
          all
        );
        if (response.IsSuccess) {
          dispatch({
            type: GETPROMOLIST_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: GETPROMOLIST_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      } catch (error) {
        dispatch({
          type: GETPROMOLIST_FAILURE,
          payload: error,
          loading: false,
        });
        return error;
      }
    },
    []
  );

  const getPlayerPromotionList = useCallback(
    async (language, page, rows, desc, sort, all) => {
      dispatch({
        type: GETPLAYERPROMOLIST_BEGIN,
        loading: true,
      });

      try {
        const response = await GeneralService.GetPlayerPromotionList(
          language,
          page,
          rows,
          desc,
          sort,
          all
        );
        if (response.IsSuccess) {
          dispatch({
            type: GETPLAYERPROMOLIST_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: GETPLAYERPROMOLIST_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      } catch (error) {
        dispatch({
          type: GETPLAYERPROMOLIST_FAILURE,
          payload: error,
          loading: false,
        });
        return error;
      }
    },
    []
  );

  const joinPromotion = useCallback(async (id) => {
    dispatch({
      type: JOINPROMO_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.JoinPromotion(id);
      if (response.IsSuccess) {
        dispatch({
          type: JOINPROMO_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: JOINPROMO_FAILURE,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: JOINPROMO_FAILURE,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const getBrandCommunication = useCallback(async () => {
    dispatch({
      type: GETBRANDCOMMUNICATION_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.GetBrandCommunication();
      if (response.IsSuccess) {
        dispatch({
          type: GETBRANDCOMMUNICATION_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: GETBRANDCOMMUNICATION_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: GETBRANDCOMMUNICATION_FAIL,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const getBrandLanguage = useCallback(async () => {
    dispatch({
      type: GETBRANDLANGUAGE_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.GetBrandLanguage();
      if (response.IsSuccess) {
        dispatch({
          type: GETBRANDLANGUAGE_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: GETBRANDLANGUAGE_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: GETBRANDLANGUAGE_FAIL,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const getBanner = useCallback(async () => {
    dispatch({
      type: GETBANNER_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.GetBanner();
      if (response.IsSuccess) {
        dispatch({
          type: GETBANNER_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: GETBANNER_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: GETBANNER_FAIL,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const getLiveChatURL = useCallback(async () => {
    dispatch({
      type: GETLIVECHATURL_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.GetLiveChatURL();
      if (response.IsSuccess) {
        dispatch({
          type: GETLIVECHATURL_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: GETLIVECHATURL_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: GETLIVECHATURL_FAIL,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const getVIP = useCallback(async () => {
    dispatch({
      type: GETVIP_BEGIN,
    });

    try {
      const response = await GeneralService.GetVIP();
      if (response.IsSuccess) {
        dispatch({
          type: GETVIP_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETVIP_FAILED,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getInvitationCode = useCallback(async () => {
    try {
      const response = await GeneralService.GetInvitationCode();
      if (response.IsSuccess) {
        dispatch({
          type: GETINVITATIONCODE_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETINVITATIONCODE_FAILED,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getPromotionRouletteStatus = useCallback(async (id) => {
    dispatch({
      type: GETPROMOROULETTE_STATUS_BEGIN,
    });

    try {
      const response = await GeneralService.GetPromotionRouletteStatus(id);
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOROULETTE_STATUS_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETPROMOROULETTE_STATUS_FAILED,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getPromotionRouletteResult = useCallback(async (id) => {
    dispatch({
      type: GETPROMOROULETTE_RESULT_BEGIN,
    });

    try {
      const response = await GeneralService.GetPromotionRouletteResult(id);
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOROULETTE_RESULT_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETPROMOROULETTE_RESULT_FAILED,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getPromotion = useCallback(async () => {
    dispatch({
      type: GETPROMOTION_BEGIN,
    });

    try {
      const response = await GeneralService.GetPromotion();
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOTION_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETPROMOTION_FAILURE,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getPromotionRouletteCount = useCallback(async () => {
    dispatch({
      type: GETROULETTE_COUNT_BEGIN,
    });

    try {
      const response = await GeneralService.GetPromotionRouletteCount();
      if (response.IsSuccess) {
        dispatch({
          type: GETROULETTE_COUNT_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETROULETTE_COUNT_FAILED,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getDepositAccumulateRoulette = useCallback(async (id: string) => {
    try {
      //
      return await GeneralService.GetDepositAccumulateRoulette(id);
    } catch (error) {
      return error;
    }
  }, []);

  const getDepositAccumulateRouletteResult = useCallback(async (id: string) => {
    try {
      return await GeneralService.GetDepositAccumulateRouletteResult(id);
    } catch (error) {
      return error;
    }
  }, []);

  const getDepositAccumulateRouletteHistory = useCallback(
    async (id: string) => {
      try {
        return await GeneralService.GetDepositAccumulateRouletteHistory(id);
      } catch (error) {
        return error;
      }
    },
    []
  );

  const getBrandAllAgent = useCallback(async () => {
    try {
      const response = await GeneralService.GetBrandAllAgent("");
      if (response.IsSuccess) {
        dispatch({
          type: GETBRANDALLAGENT_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETBRANDALLAGENT_FAIL,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getAffiliateStatus = useCallback(async () => {
    try {
      const response = await GeneralService.GetAffiliateStatus();
      if (response.IsSuccess) {
        dispatch({
          type: GETAFFILIATESTATUS_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: GETAFFILIATESTATUS_FAIL,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  }, []);

  const getMemoV2 = useCallback(async () => {
    dispatch({
      type: GETMEMOV2_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.GetMemoV2("", 0, 0);
      if (response.IsSuccess) {
        dispatch({
          type: GETMEMOV2_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: GETMEMOV2_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: GETMEMOV2_FAIL,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const replyMemo = useCallback(async (id, message) => {
    dispatch({
      type: REPLYMEMO_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.ReplyMemo(id, message);
      if (response.IsSuccess) {
        dispatch({
          type: REPLYMEMO_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: REPLYMEMO_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: REPLYMEMO_FAIL,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const composeMemo = useCallback(async (subject, message) => {
    dispatch({
      type: COMPOSEMEMO_BEGIN,
      loading: true,
    });

    try {
      const response = await GeneralService.ComposeMemo(subject, message);
      if (response.IsSuccess) {
        dispatch({
          type: COMPOSEMEMO_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: COMPOSEMEMO_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: COMPOSEMEMO_FAIL,
        payload: error,
        loading: false,
      });
      return error;
    }
  }, []);

  const readMemo = useCallback(async (id) => {
    dispatch({
      type: READMEMO_BEGIN,
    });

    try {
      const response = await GeneralService.ReadMemo(id);
      if (response.IsSuccess) {
        dispatch({
          type: READMEMO_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: READMEMO_FAIL,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: READMEMO_FAIL,
        payload: error,
      });
      return error;
    }
  }, []);

  const deliveryBox = useCallback(async () => {
    // TODO:GeneralService.DeliveryBox() is not defined;
    // dispatch({
    //   type: DELIVERYBOX_BEGIN,
    // });
    //
    // try {
    //   const response = await GeneralService.DeliveryBox();
    //   if (response.IsSuccess) {
    //     dispatch({
    //       type: DELIVERYBOX_SUCCESS,
    //       payload: response,
    //     });
    //   } else {
    //     dispatch({
    //       type: DELIVERYBOX_FAIL,
    //       payload: response,
    //     });
    //   }
    //   return response;
    // } catch (error) {
    //   dispatch({
    //     type: DELIVERYBOX_FAIL,
    //     payload: error,
    //   });
    //   return error;
    // }
  }, []);

  return {
    general,
    getMobilePrefix,
    getSiteToken,
    getPromotionList,
    joinPromotion,
    getPlayerPromotionList,
    getBrandCommunication,
    getBrandLanguage,
    getLiveChatURL,
    getBanner,
    getBrand,
    getVIP,
    getInvitationCode,
    getPromotionRouletteStatus,
    getPromotionRouletteResult,
    getPromotion,
    getPromotionRouletteCount,
    getDepositAccumulateRoulette,
    getDepositAccumulateRouletteResult,
    getDepositAccumulateRouletteHistory,
    getBrandAllAgent,
    getAffiliateStatus,
    getMemoV2,
    replyMemo,
    composeMemo,
    readMemo,
    deliveryBox,
  };
}
