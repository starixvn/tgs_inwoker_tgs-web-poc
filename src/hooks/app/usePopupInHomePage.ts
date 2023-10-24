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

  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  useEffect(() => {
    // popup announcement logic
    const isInHomePage = mains && mains.length > 0;

    if (config.features.PopupAnnouncement) {
      if (isInHomePage) {
        setOpenAnnouncement(true);
        // setShowPromotion(false);
      }
    }
  }, [JSON.stringify(mains)]);

  useEffect(() => {
    const isInHomePage = mains && mains.length > 0;

    // popup promotion logic
    if (config.features.PopupPromotion) {
      if (isInHomePage && promotionList.items.length > 0) {
        if (!openAnnouncement) {
          setShowPromotion(true);
        }
      }
    }
  }, [JSON.stringify(promotionList.items)]);

  const handleCloseAudio = () => {
    if (document.getElementById("audio") != null)
      document.getElementById("audio").play();
  };

  const handleCloseAnnouncement = () => {
    setOpenAnnouncement(false);
    setShowPromotion(true);
    handleCloseAudio();
  };

  const handleClosePromotion = () => {
    setShowPromotion(false);
    handleCloseAudio();
  };

  const matchingPath =
    window.location.pathname === "/" ||
    window.location.pathname === "/main/home";

  const showPopupAnnouncement =
    config.features.PopupAnnouncement &&
    mains &&
    mains.length > 0 &&
    matchingPath;

  const showPopupPromotion =
    config.features.PopupPromotion && promotionList.items.length > 0;

  return {
    openAnnouncement,
    showPromotion,
    handleCloseAnnouncement,
    handleClosePromotion,
    showPopupAnnouncement,
    showPopupPromotion,
  };
}
