import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Support from "@/components/_Share_Domain/Account/Support";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { BrandsSupport } from "@/types/general";

const mockBrandsSupportList: BrandsSupport[] = [
  {
    type: "Skype",
    phone: "123456789",
    appid: null,
    qrcodeurl:
      "https://project.srvptt.com/tgs-project/messengerQRCode/OKrJ4cLIMjjoGUlIveCK40lufV7X8r0k.png",
  },
  {
    type: "WhatsApp",
    phone: null,
    appid: null,
    qrcodeurl:
      "https://project.srvptt.com/tgs-project/messengerQRCode/78r0QnnLBE6WI0Bn36RzXOw0NjosJWvy.png",
  },
  {
    type: "Telegram",
    phone: "16713494701",
    appid: null,
    qrcodeurl:
      "https://project.srvptt.com/tgs-project/messengerQRCode/LCdD789hQrcE9k8RdblMsBVvcPH72nD5.png",
  },
  {
    type: "WeChat",
    phone: null,
    appid: "32123213213",
    qrcodeurl:
      "https://project.srvptt.com/tgs-project/messengerQRCode/GNh5OGHKKpb2Q496Phj7qz8GfJGseCuA.png",
  },
];

type Props = {};
const ContactUsPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("main.account.appDownload"));
  }, []);

  const { general } = useGeneralStore();

  const csLiveChatUrl = general?.livechat?.setting?.url || "www.google.com";
  const handleContactCs = useCallback(() => {
    console.log("Contact CS");
  }, []);

  const displayedBrandsSupportList = useMemo(() => {
    // if (config.features.DisplayPhone) {
    //   mockBrandsSupportList.push({
    //     appid: null,
    //     phone: mockBrandsSupportList?.[0]?.phone || null,
    //     qrcodeurl: null,
    //     type: "Phone",
    //   });
    // }
    return mockBrandsSupportList;
  }, []);

  return (
    <Support
      brandsSupportList={displayedBrandsSupportList}
      csLiveChatUrl={csLiveChatUrl}
      handleContactCs={handleContactCs}
    />
  );
};

export default ContactUsPage;
