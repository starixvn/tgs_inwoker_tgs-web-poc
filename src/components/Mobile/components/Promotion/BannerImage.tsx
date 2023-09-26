import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import i18n from "@/utils/i18n";
import { useMemo } from "react";

const BannerImage = ({ promotionData }: { promotionData: Promotion }) => {
  const language = i18n.language;

  const mobileBanner = useMemo(() => {
    if (!promotionData) return "";

    const localeImage = promotionData.localization[language]?.mobileBanner;
    if (localeImage) {
      return localeImage;
    }
    return promotionData.mobileBanner;
  }, [promotionData, language]);

  return (
    <img
      src={mobileBanner}
      alt="promotion banner"
      width={"100%"}
      height={"100%"}
      style={{ objectFit: "cover" }}
    />
  );
};

export default BannerImage;
