import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeneralState } from "@/types/stores/general";
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
import { GetSiteTokenResDto } from "@/models/dto/general/GetSiteTokenResDto";
import { GetBrandResDto } from "@/models/dto/general/GetBrandResDto";
import { GetPromotionListResDto } from "@/models/dto/general/GetPromotionListResDto";
import { GetPlayerPromotionListResDto } from "@/models/dto/general/GetPlayerPromotionListResDto";
import { JoinPromotionResDto } from "@/models/dto/general/JoinPromotionResDto";
import { GetBrandCommunicationResDto } from "@/models/dto/general/GetBrandCommunicationResDto";
import { GetBrandLanguageResDto } from "@/models/dto/general/GetBrandLanguageResDto";
import { GetBannerResDto } from "@/models/dto/general/GetBannerResDto";
import { GetLiveChatUrlResDto } from "@/models/dto/general/GetLiveChatUrlResDto";
import { GetVipResDto } from "@/models/dto/general/GetVipResDto";
import { GetInvitationCodeResDto } from "@/models/dto/general/GetInvitationCodeResDto";
import { GetPromotionRouletteResultResDto } from "@/models/dto/general/GetPromotionRouletteResultResDto";
import { GetPromotionRouletteStatusResDto } from "@/models/dto/general/GetPromotionRouletteStatusResDto";
import { GetPromotionDto } from "@/models/dto/general/GetPromotionDto";
import { GetPromotionRouletteCountResDto } from "@/models/dto/general/GetPromotionRouletteCountResDto";
import { GetDepositAccumulateRouletteResDto } from "@/models/dto/general/GetDepositAccumulateRouletteResDto";
import { GetDepositAccumulateRouletteResultResDto } from "@/models/dto/general/GetDepositAccumulateRouletteResultResDto";
import { GetDepositAccumulateRouletteHistoryResDto } from "@/models/dto/general/GetDepositAccumulateRouletteHistoryResDto";
import { GetBrandAllAgentResDto } from "@/models/dto/general/GetBrandAllAgentResDto";
import { GetAffiliateStatusResDto } from "@/models/dto/general/GetAffiliateStatusResDto";
import { GetMemoV2ResDto } from "@/models/dto/general/GetMemoV2ResDto";
import { ReplyMemoResDto } from "@/models/dto/general/ReplyMemoResDto";
import { ComposeMemoResDto } from "@/models/dto/general/ComposeMemoResDto";
import { ReadMemoResDto } from "@/models/dto/general/ReadMemoResDto";

export function useGeneralStore() {
  const dispatch = useDispatch();
  //@ts-ignore
  const general: GeneralState = useSelector((state) => state.general);

  const getSiteToken = useCallback(async () => {
    try {
      const response =
        (await GeneralService.GetSiteToken()) as unknown as GetSiteTokenResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {
      dispatch({
        type: GETSITETOKEN_FAIL,
        payload: error.data,
      });
    }
  }, []);

  const getBrand = useCallback(async () => {
    try {
      //  @ts-ignore
      const response =
        (await GeneralService.GetBrand()) as unknown as GetBrandResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {
      dispatch({
        type: GETBRAND_FAIL,
        payload: error,
      });
    }
  }, []);

  const getMobilePrefix = useCallback(async () => {
    // TODO:GeneralService.GetMobilePrefix is not defined
    // try {
    //   const response = await GeneralService.GetMobilePrefix();
    //   if (response?.IsSuccess) {
    //     dispatch({
    //       type: GETMOBILEPREFIX_SUCCESS,
    //       payload: response.data,
    //     });
    //   }
    //   return response;
    // } catch (error: any) {
    // }
  }, []);

  const getPromotionList = useCallback(
    async (
      language: string,
      page: number,
      rows: number,
      desc: boolean,
      sort: string,
      all: boolean
    ) => {
      dispatch({
        type: GETPROMOLIST_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await GeneralService.GetPromotionList(
          language,
          page,
          rows,
          desc,
          sort,
          all
        )) as unknown as GetPromotionListResDto;
        if (response?.IsSuccess) {
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
      } catch (error: any) {
        dispatch({
          type: GETPROMOLIST_FAILURE,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const getPlayerPromotionList = useCallback(
    async (
      language: string,
      page: number,
      rows: number,
      desc: boolean,
      sort: string,
      all: boolean
    ) => {
      dispatch({
        type: GETPLAYERPROMOLIST_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await GeneralService.GetPlayerPromotionList(
          language,
          page,
          rows,
          desc,
          sort,
          all
        )) as unknown as GetPlayerPromotionListResDto;
        if (response?.IsSuccess) {
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
      } catch (error: any) {
        dispatch({
          type: GETPLAYERPROMOLIST_FAILURE,
          payload: error,
          loading: false,
        });
      }
    },
    []
  );

  const joinPromotion = useCallback(async (id: string) => {
    dispatch({
      type: JOINPROMO_BEGIN,
      loading: true,
    });

    try {
      //  @ts-ignore
      const response = (await GeneralService.JoinPromotion(
        id
      )) as JoinPromotionResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {
      dispatch({
        type: JOINPROMO_FAILURE,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const getBrandCommunication = useCallback(async () => {
    dispatch({
      type: GETBRANDCOMMUNICATION_BEGIN,
      loading: true,
    });

    try {
      const response =
        (await GeneralService.GetBrandCommunication()) as unknown as GetBrandCommunicationResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {
      dispatch({
        type: GETBRANDCOMMUNICATION_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const getBrandLanguage = useCallback(async () => {
    dispatch({
      type: GETBRANDLANGUAGE_BEGIN,
      loading: true,
    });

    try {
      const response =
        (await GeneralService.GetBrandLanguage()) as unknown as GetBrandLanguageResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {
      dispatch({
        type: GETBRANDLANGUAGE_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const getBanner = useCallback(async () => {
    dispatch({
      type: GETBANNER_BEGIN,
      loading: true,
    });

    try {
      //  @ts-ignore
      const response =
        (await GeneralService.GetBanner()) as unknown as GetBannerResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {
      dispatch({
        type: GETBANNER_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const getLiveChatURL = useCallback(async () => {
    dispatch({
      type: GETLIVECHATURL_BEGIN,
      loading: true,
    });

    try {
      const response =
        (await GeneralService.GetLiveChatURL()) as unknown as GetLiveChatUrlResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {
      dispatch({
        type: GETLIVECHATURL_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const getVIP = useCallback(async () => {
    dispatch({
      type: GETVIP_BEGIN,
    });

    try {
      //  @ts-ignore
      const response =
        (await GeneralService.GetVIP()) as unknown as GetVipResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {}
  }, []);

  const getInvitationCode = useCallback(async () => {
    try {
      const response =
        (await GeneralService.GetInvitationCode()) as unknown as GetInvitationCodeResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {}
  }, []);

  const getPromotionRouletteStatus = useCallback(async (id: string) => {
    dispatch({
      type: GETPROMOROULETTE_STATUS_BEGIN,
    });

    try {
      //  @ts-ignore
      const response = (await GeneralService.GetPromotionRouletteStatus(
        id
      )) as unknown as GetPromotionRouletteStatusResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {}
  }, []);

  const getPromotionRouletteResult = useCallback(async (id) => {
    dispatch({
      type: GETPROMOROULETTE_RESULT_BEGIN,
    });

    try {
      //  @ts-ignore
      const response = (await GeneralService.GetPromotionRouletteResult(
        id
      )) as unknown as GetPromotionRouletteResultResDto;
      if (response?.IsSuccess) {
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
    } catch (error: any) {}
  }, []);

  const getPromotion = useCallback(async () => {
    dispatch({
      type: GETPROMOTION_BEGIN,
    });

    try {
      //  @ts-ignore
      const response =
        (await GeneralService.GetPromotion()) as unknown as GetPromotionDto;
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
    } catch (error: any) {}
  }, []);

  const getPromotionRouletteCount = useCallback(async () => {
    dispatch({
      type: GETROULETTE_COUNT_BEGIN,
    });

    try {
      const response =
        (await GeneralService.GetPromotionRouletteCount()) as unknown as GetPromotionRouletteCountResDto;
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
    } catch (error: any) {}
  }, []);

  const getDepositAccumulateRoulette = useCallback(async (id: string) => {
    try {
      return (await GeneralService.GetDepositAccumulateRoulette(
        id
      )) as unknown as GetDepositAccumulateRouletteResDto;
    } catch (error: any) {}
  }, []);

  const getDepositAccumulateRouletteResult = useCallback(async (id: string) => {
    try {
      return (await GeneralService.GetDepositAccumulateRouletteResult(
        id
      )) as unknown as GetDepositAccumulateRouletteResultResDto;
    } catch (error: any) {}
  }, []);

  const getDepositAccumulateRouletteHistory = useCallback(
    async (id: string) => {
      try {
        return (await GeneralService.GetDepositAccumulateRouletteHistory(
          id
        )) as unknown as GetDepositAccumulateRouletteHistoryResDto;
      } catch (error: any) {}
    },
    []
  );

  const getBrandAllAgent = useCallback(async () => {
    try {
      //  @ts-ignore
      const response = (await GeneralService.GetBrandAllAgent(
        ""
      )) as unknown as GetBrandAllAgentResDto;
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
    } catch (error: any) {}
  }, []);

  const getAffiliateStatus = useCallback(async () => {
    try {
      const response =
        (await GeneralService.GetAffiliateStatus()) as unknown as GetAffiliateStatusResDto;
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
    } catch (error: any) {}
  }, []);

  const getMemoV2 = useCallback(async () => {
    dispatch({
      type: GETMEMOV2_BEGIN,
      loading: true,
    });

    try {
      //  @ts-ignore
      const response = (await GeneralService.GetMemoV2(
        "",
        0,
        0
      )) as unknown as GetMemoV2ResDto;
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
    } catch (error: any) {
      dispatch({
        type: GETMEMOV2_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const replyMemo = useCallback(async (id: string, message: string) => {
    dispatch({
      type: REPLYMEMO_BEGIN,
      loading: true,
    });

    try {
      //  @ts-ignore
      const response = (await GeneralService.ReplyMemo(
        id,
        message
      )) as ReplyMemoResDto;
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
    } catch (error: any) {
      dispatch({
        type: REPLYMEMO_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const composeMemo = useCallback(async (subject, message) => {
    dispatch({
      type: COMPOSEMEMO_BEGIN,
      loading: true,
    });

    try {
      //  @ts-ignore
      const response = (await GeneralService.ComposeMemo(
        subject,
        message
      )) as ComposeMemoResDto;
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
    } catch (error: any) {
      dispatch({
        type: COMPOSEMEMO_FAIL,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const readMemo = useCallback(async (id: string) => {
    dispatch({
      type: READMEMO_BEGIN,
    });

    try {
      //  @ts-ignore
      const response = (await GeneralService.ReadMemo(id)) as ReadMemoResDto;
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
    } catch (error: any) {
      dispatch({
        type: READMEMO_FAIL,
        payload: error,
      });
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
    // } catch (error: any) {
    //   dispatch({
    //     type: DELIVERYBOX_FAIL,
    //     payload: error,
    //   });
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
