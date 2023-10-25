import React, { useEffect } from "react";
import i18n from "@/utils/i18n";
import Config from "@/config/config";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";

export function useInitLanguage() {
  const [isLanguageReady, setIsLanguageReady] = React.useState(false);
  const { getBrandLanguage } = useGeneralStore();

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      document.getElementById("title").innerHTML = i18n
        .t("common.title")
        .replace(/{brand}/g, Config.brandName);
      document
        .getElementById("description")
        .setAttribute(
          "content",
          i18n.t("common.title").replace(/{brand}/g, Config.brandName)
        );
    });

    i18n.on("loaded", async (options) => {
      await getBrandLanguage();
      setIsLanguageReady(true);
    });
  }, []);

  return {
    isLanguageReady,
  };
}
