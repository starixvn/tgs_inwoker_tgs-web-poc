import { useEffect, useState } from "react";
import config from "@/config/config";
import { useParams } from "react-router";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { UserTypeEnum } from "@/hooks/auth/useAuthForm/useRegisterForm";

export function usePromotionCode() {
  const { promotionid, promotionchannelid } = useParams();
  const { general, getInvitationCode } = useGeneralStore();

  // ===== promotion =====
  const [promotionData, setPromotionData] = useState({
    withPromo: !(
      config.affiliateId === "" &&
      localStorage.getItem("promotionId") === "" &&
      !localStorage.getItem("promotionId")
    ),
    promoId:
      config.affiliateId !== ""
        ? config.affiliateId
        : localStorage.getItem("promotionId"),
    promotionChannelId: localStorage.getItem("promotionChannelId"),
    //TGS-357
    upper: localStorage.getItem("upper"),
    promoteType:
      localStorage.getItem("invitationtype") === ""
        ? UserTypeEnum.AGENT
        : (localStorage.getItem("invitationtype") as UserTypeEnum),
    prefill: !!(
      localStorage.getItem("upper") ||
      localStorage.getItem("promotionId") ||
      localStorage.getItem("invitationtype") !== ""
    ),
    fromCustomDomain: false,
  });

  const initPromotionInfo = async () => {
    if (general.brand.hasInvitationCode) {
      await fetchInvitationCode();
    }

    // TODO: no GeneralService.AffiliateClick found
    if (!isNaN(promotionid) && !isNaN(promotionchannelid)) {
      // GeneralService.AffiliateClick(promotionid, promotionchannelid);
    }
  };

  const fetchInvitationCode = async () => {
    try {
      const result = await getInvitationCode();

      if (!result.IsSuccess || !result.data.invitationCode) return;

      setPromotionData((prevState) => ({
        ...prevState,
        promoteType: UserTypeEnum.AGENT,
        promoId: result.data.invitationCode,
        prefill: true,
        fromCustomDomain: true,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initPromotionInfo().then();
  }, []);

  return { promotionData };
}
