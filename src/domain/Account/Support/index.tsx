import React, { useState } from "react";
import config from "@/config/config";
import { BrandsSupport } from "@/types/stores/general";
import styled from "styled-components";
import SupportCard from "@/domain/Account/Support/SupportCard";
import QrCodeDialog from "@/domain/Account/Support/QRCodeHolder";
import contactGirlImg from "@/assets/t18/images/account/girl/contact.png";
import IMHandler from "@/domain/Account/Support/IMHandler";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
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
