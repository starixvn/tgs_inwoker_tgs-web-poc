import React, { useCallback } from "react";
import styled from "styled-components";
import { BrandsSupport } from "@/types/stores/general";
import i18n from "@/utils/i18n";
import Icon from "@/components/Icon";
import { media } from "@/theme/breakpoints";

const SupportCardContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 21px;
  background: ${({ theme }) => theme.tertiaryDark};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.098rem;

  & > * {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  width: calc((100% - 16px * (2 - 1)) / 2);

  ${media.sm} {
    width: calc((100% - 16px * (3 - 1)) / 4);
  }
`;

const iconSwitcher = (icon: string) => {
  switch (icon) {
    case "WeChat":
      return "support-wechat.svg";
    case "Line":
      return "support-line.svg";
    case "Telegram":
      return "support-telegram.svg";
    case "Skype":
      return "support-skype.svg";
    case "KakaoTalk":
      return "support-kakaotalk.svg";
    case "Viber":
      return "support-viber.svg";
    case "WhatsApp":
      return "support-whatsapp.svg";
    case "Zalo":
      return "support-zalo.svg";
    case "copy":
      return "copy.png";
    default:
      return "support-call.svg";
  }
};

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactButton = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.primary};
  padding: 6px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 0.878rem;
  border-radius: 5px;
`;

type Props = {
  brandsSupport: BrandsSupport;
  handleClick: (brandsSupport: BrandsSupport) => void;
};
const SupportCard = ({ brandsSupport, handleClick }: Props) => {
  const { type } = brandsSupport;

  const handleClickCard = useCallback(() => {
    handleClick(brandsSupport);
  }, []);

  return (
    <SupportCardContainer onClick={handleClickCard}>
      <IconContainer>
        <Icon
          iconUrl={`${
            process.env.PUBLIC_URL
          }/assets/images/support/${iconSwitcher(brandsSupport.type)}`}
          width={"26px"}
          height={"26px"}
        />
      </IconContainer>

      <span>{type}</span>

      <ContactButton>{i18n.t("common.contact")}</ContactButton>
    </SupportCardContainer>
  );
};

export default SupportCard;
