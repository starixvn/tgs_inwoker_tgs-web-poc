import i18n from "@/utils/i18n";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useEffect } from "react";

export function useLanguageDetect() {
  const {
    general: { brandLanguage },
  } = useGeneralStore();

  const checkIfLanguageIsInBrand = () => {
    if (!brandLanguage.length) return;

    const currentLanguage = i18n.language;

    const isLanguageInBrand = brandLanguage.some(
      (lang) => lang.culturecode === currentLanguage
    );

    if (isLanguageInBrand) {
      return;
    }

    const newLanguage = brandLanguage[0].culturecode;
    i18n.changeLanguage(newLanguage);
    window.location.reload();
  };

  // language changed
  useEffect(() => {
    checkIfLanguageIsInBrand();
  }, [JSON.stringify(brandLanguage), i18n]);
}
