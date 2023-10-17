import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import i18n from "@/utils/i18n";
import { useMemo } from "react";
import { useRwd } from "@/hooks/useRwd";

const BannerImage = ({ promotionData }: { promotionData: Promotion }) => {
  const { isSmSize } = useRwd();
  const language = i18n.language;

  const [mobileBanner, desktopBanner] = useMemo(() => {
    if (!promotionData) return "";

    let mobileBanner = promotionData.mobileBanner;
    let desktopBanner = promotionData.desktopBanner;

    const mobileBannerByLocale =
      promotionData.localization[language]?.mobileBanner;
    const desktopBannerByLocale =
      promotionData.localization[language]?.desktopBanner;

    if (mobileBannerByLocale) {
      mobileBanner = mobileBannerByLocale;
    }
    if (desktopBannerByLocale) {
      desktopBanner = desktopBannerByLocale;
    }
    return [mobileBanner, desktopBanner];
  }, [promotionData, language]);

  const imageUrl = isSmSize ? mobileBanner : desktopBanner;
  return (
    <img
      src={imageUrl}
      alt="promotion banner"
      width={"100%"}
      height={"100%"}
      style={{ objectFit: "cover" }}
    />
  );
};

export default BannerImage;
