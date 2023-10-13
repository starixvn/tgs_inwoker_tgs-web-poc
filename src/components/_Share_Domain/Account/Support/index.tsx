import React, { useState } from "react";
import config from "@/config/config";
import { BrandsSupport } from "@/types/general";
import styled from "styled-components";
import { themeList } from "@/theme";
import SupportCard from "@/components/_Share_Domain/Account/Support/SupportCard";
import QrCodeDialog from "@/components/_Share_Domain/Account/Support/QRCodeHolder";
import contactGirlImg from "@/assets/images/account/girl/contact.png";
import IMHandler from "@/components/_Share_Domain/Account/Support/IMHandler";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import Common from "@/utils/Common";
import { useAuth } from "@/hooks/auth/useAuth";
import i18n from "@/utils/i18n";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useContactCS } from "@/hooks/useContactCS";

const SupportContainer = styled.div``;

const ContactGirlImage = styled.div`
  width: 100%;
  margin-bottom: 20px;

  img {
    width: 100%;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

type Props = {};
const Support = ({}: Props) => {
  const { general } = useGeneralStore();
  const { handleContactCs } = useContactCS();
  const brandsSupportList = general.brandsSupport;
  const [selectedBrandsSupport, setSelectedBrandsSupport] =
    useState<BrandsSupport | null>(null);

  //================

  const handleClick = (brandsSupport: BrandsSupport) => {
    if (brandsSupport.type === "Live") {
      handleContactCs();
      return;
    }
    console.log(brandsSupport);

    if (brandsSupport.qrcodeurl) {
      setSelectedBrandsSupport(brandsSupport);
    } else {
      IMHandler(brandsSupport.type, brandsSupport.phone); // TODO: IMHandler
    }
  };

  const handleClose = () => {
    setSelectedBrandsSupport(null);
  };

  const csLiveChatUrl = general?.livechat?.setting?.url || "www.google.com";

  return (
    <SupportContainer>
      <ContactGirlImage>
        <img src={contactGirlImg} alt={"contact"} />
      </ContactGirlImage>
      <CardsContainer>
        {(config.features.LiveChatVendor || csLiveChatUrl) && (
          <SupportCard
            brandsSupport={{
              appid: null,
              phone: null,
              qrcodeurl: null,
              type: "Live",
            }}
            handleClick={handleClick}
          />
        )}

        {brandsSupportList.map((brandsSupport, index) => {
          return (
            <SupportCard
              key={index}
              handleClick={handleClick}
              brandsSupport={brandsSupport}
            />
          );
        })}
      </CardsContainer>

      <QrCodeDialog
        selectedBrandsSupport={selectedBrandsSupport}
        handleClose={handleClose}
      />
    </SupportContainer>
  );
};

export default Support;
