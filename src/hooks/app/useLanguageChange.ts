import i18n from "@/utils/i18n";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useEffect } from "react";

export function useLanguageChange() {
  const {
    general: { brandLanguage },
  } = useGeneralStore();
  const handleLanguageChanged = () => {
    const currentLanguage = i18n.language;
    const pathParts = window.location.pathname.split("/");

    if (!brandLanguage.length) return;

    const isLanguageInBrand = brandLanguage.some(
      (lang) => lang.culturecode === currentLanguage
    );

    if (isLanguageInBrand) {
      if (!(pathParts[1] !== currentLanguage || pathParts.length > 3)) return;
      i18n.changeLanguage(currentLanguage);
    } else {
      const newLanguage = brandLanguage[0].culturecode;
      i18n.changeLanguage(newLanguage);
      window.location.reload();
    }
  };

  // language changed
  useEffect(() => {
    handleLanguageChanged();
  }, [brandLanguage]);
}
