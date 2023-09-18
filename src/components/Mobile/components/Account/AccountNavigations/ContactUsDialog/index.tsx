import React, { useCallback, useMemo } from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import Support from "@/components/Mobile/components/Support";
import { useGeneral } from "@/components/Mobile/hooks/useGeneral";
import { BrandsSupport } from "@/types/general";

const theme = themeList["mobileT18"];

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

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

const ContactUsDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { general } = useGeneral();

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
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Contact Us"}
      >
        <Support
          brandsSupportList={displayedBrandsSupportList}
          csLiveChatUrl={csLiveChatUrl}
          handleContactCs={handleContactCs}
        />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(ContactUsDialog);
