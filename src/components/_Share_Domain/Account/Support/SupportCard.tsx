import React, { useCallback } from "react";
import styled from "styled-components";
import { themeList } from "@/theme";
import { BrandsSupport } from "@/types/general";
import i18n from "@/utils/i18n";

const theme = themeList["mobileT18"];

const SupportCardContainer = styled.div`
  width: calc((100% - 16px) / 2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 21px;
  background: ${theme.tertiaryDark};
  color: ${theme.white};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.098rem;

  & > * {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
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

type IconProps = { icon: string };
const Icon = styled.div<IconProps>`
  width: 60px;
  height: 60px;
  background-color: ${theme.tertiary};
  mask: ${({ icon }: IconProps) => {
    return `url(${
      process.env.PUBLIC_URL + "/assets/images/wapp/" + iconSwitcher(icon)
    }) no-repeat center /
    contain;`;
  }};
`;

const ContactButton = styled.div`
  width: 100%;
  color: ${theme.white};
  background: ${theme.primary};
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
  const { appid, phone, qrcodeurl, type } = brandsSupport;

  const handleClickCard = useCallback(() => {
    handleClick(brandsSupport);
  }, []);

  return (
    <SupportCardContainer onClick={handleClickCard}>
      <Icon icon={brandsSupport.type} />

      <span>{type}</span>

      <ContactButton>{i18n.t("common.contact")}</ContactButton>
    </SupportCardContainer>
  );
};

export default SupportCard;
