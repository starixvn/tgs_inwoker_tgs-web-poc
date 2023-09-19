import React, { useState } from "react";
import config from "@/config/config";
import IMHandler from "@/components/Wap/components/Main/Support/IMHandler";
import { BrandsSupport } from "@/types/general";
import styled from "styled-components";
import { themeList } from "@/theme";
import SupportCard from "@/components/Mobile/components/Account/AccountNavigations/ContactUsDialog/Support/SupportCard";
import QrCodeDialog from "@/components/Mobile/components/Account/AccountNavigations/ContactUsDialog/Support/QRCodeHolder";
import contactGirlImg from "@/assets/images/contactUs/contact.png";

const theme = themeList["mobileT18"];

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

type Props = {
  brandsSupportList: BrandsSupport[];
  csLiveChatUrl: string;
  handleContactCs: () => void;
};
const Support = ({
  brandsSupportList,
  csLiveChatUrl,
  handleContactCs,
}: Props) => {
  const [selectedBrandsSupport, setSelectedBrandsSupport] =
    useState<BrandsSupport | null>(null);

  const handleClick = (brandsSupport: BrandsSupport) => {
    if (brandsSupport.type === "Live") {
      handleContactCs();
      return;
    }

    if (brandsSupport.qrcodeurl) {
      setSelectedBrandsSupport(brandsSupport);
    } else {
      IMHandler(brandsSupport.type, brandsSupport.phone);
    }
  };

  const handleClose = () => {
    setSelectedBrandsSupport(null);
  };

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
