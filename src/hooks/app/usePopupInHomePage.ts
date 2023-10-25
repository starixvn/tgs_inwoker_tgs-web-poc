import { useEffect, useState } from "react";
import config from "@/config/config";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";

export function usePopupInHomePage() {
  const {
    ui: { mains },
  } = useUiStore();
  const {
    general: { promotionList },
  } = useGeneralStore();

  const [isOpenAnnouncement, setIsOpenAnnouncement] = useState(false);
  const [isShowPromotion, setIsShowPromotion] = useState(false);

  const isInHomePage = mains && mains.length > 0;

  useEffect(() => {
    handleOpenAnnouncement();
  }, [JSON.stringify(mains)]);

  const handleOpenAnnouncement = () => {
    if (!config.features.PopupAnnouncement) {
      return;
    }
    if (!isInHomePage) {
      return;
    }

    if (isOpenAnnouncement) return;

    setIsOpenAnnouncement(true);
  };

  const handleOpenPromotion = () => {
    if (!config.features.PopupPromotion) {
      return;
    }

    if (!isInHomePage || !promotionList.items.length) {
      return;
    }
    if (isShowPromotion) {
      return;
    }

    setIsShowPromotion(true);
  };

  const handleCloseAudio = () => {
    if (document.getElementById("audio") != null)
      document.getElementById("audio").play();
  };

  const handleCloseAnnouncement = () => {
    setIsOpenAnnouncement(false);
    handleOpenPromotion();
    handleCloseAudio();
  };

  const handleClosePromotion = () => {
    setIsShowPromotion(false);
    handleCloseAudio();
  };

  const matchingPath =
    window.location.pathname === "/" ||
    window.location.pathname === "/main/home";

  const needToShowPopupAnnouncement =
    config.features.PopupAnnouncement &&
    mains &&
    mains.length > 0 &&
    matchingPath;

  const needToShowPopupPromotion =
    config.features.PopupPromotion && promotionList.items.length > 0;

  return {
    isOpenAnnouncement,
    isShowPromotion,
    handleCloseAnnouncement,
    handleClosePromotion,
    needToShowPopupAnnouncement,
    needToShowPopupPromotion,
  };
}
