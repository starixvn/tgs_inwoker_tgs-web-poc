import React, { useMemo } from "react";
import styled from "styled-components";
import phoneImg from "@/assets/images/account/icon_phone.png";
import emailImg from "@/assets/images/account/icon_email.png";
import birthImg from "@/assets/images/account/icon_birth.png";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import Avatar from "@/components/Mobile/components/Avatar";
import i18n from "@/utils/i18n";

const InfoCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 28px;
`;

const Border = styled.div`
  border: 1px solid ${({ theme }) => theme.tertiary};
  margin: 0 30px;
  height: 115px;
`;

const InfoItemListContainer = styled.div`
  & > div {
    margin-bottom: 18px;
  }
`;

const InfoItemContainer = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  & > .logo {
    width: 26px;
    height: 26px;
    margin-right: 9px;
  }
  & > img {
    object-fit: contain;
  }

  & > .unbound {
    color: #d7384e;
  }
`;

interface InfoItem {
  infoType: string;
  value: string;
  logoImg: string;
  isNotValid: boolean;
}

const InfoCard = (props: any) => {
  const { account } = useAccountStore();
  const accountInfo = account.info;

  const infoItemList: InfoItem[] = useMemo(() => {
    return [
      {
        infoType: "phone",
        logoImg: phoneImg,
        value: accountInfo.member_phone || i18n.t("profile.notVerify"),
        isNotValid: !accountInfo.member_phone,
      },
      {
        infoType: "email",
        logoImg: emailImg,
        value: accountInfo.member_email || i18n.t("profile.notSet"),
        isNotValid: !accountInfo.member_email,
      },
      {
        infoType: "birth",
        logoImg: birthImg,
        value: accountInfo.member_birthday || i18n.t("profile.notSet"),
        isNotValid: !accountInfo.member_birthday,
      },
    ];
  }, [accountInfo]);

  return (
    // @ts-ignore
    <InfoCardContainer {...props}>
      <Avatar />

      <Border />

      <InfoItemListContainer>
        {infoItemList.map((infoItem) => {
          const { logoImg, infoType, value, isNotValid } = infoItem;
          return (
            <InfoItemContainer key={infoType}>
              <div className={"logo"}>
                <img src={logoImg} alt={"avatar"} />
              </div>

              <span className={isNotValid ? "unbound" : ""}>{value}</span>
            </InfoItemContainer>
          );
        })}
      </InfoItemListContainer>
    </InfoCardContainer>
  );
};

export default InfoCard;
