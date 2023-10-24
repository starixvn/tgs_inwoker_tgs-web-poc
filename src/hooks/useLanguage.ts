import React, { useEffect } from "react";
import i18n from "@/utils/i18n";
import Config from "@/config/config";

export function useLanguage() {
  const [isLanguageReady, setIsLanguageReady] = React.useState(false);

  useEffect(() => {
    const languages = "zh-CN|zh-TW|en-US|id-ID|th-TH|vi-VN".split("|");
    var pathname = window.location.pathname;
    let isFoundLanguage = "";

    for (let i = 0; i < languages.length; i++) {
      if (pathname.indexOf(languages[i]) >= 0) {
        isFoundLanguage = languages[i];
        break;
      }
    }

    if (isFoundLanguage != "") {
      pathname = pathname.replace("/" + isFoundLanguage, "/");
      pathname = pathname.replace("//", "/");
      window.location.href = pathname + window.location.search;
    }
  }, []);

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

    i18n.on("loaded", function (options) {
      setIsLanguageReady(true);
    });
  }, []);

  return {
    isLanguageReady,
  };
}
