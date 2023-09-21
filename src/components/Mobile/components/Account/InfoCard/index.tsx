import React, { CSSProperties, HTMLProps, useMemo } from "react";
import styled from "styled-components";
import avatarImg from "@/assets/images/account/avatar.png";
import phoneImg from "@/assets/images/account/icon_phone.png";
import emailImg from "@/assets/images/account/icon_email.png";
import birthImg from "@/assets/images/account/icon_birth.png";
import { themeList } from "@/theme";
import { ReactI18NextChild } from "react-i18next";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

const theme = themeList["mobileT18"];

const InfoCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 28px;
`;

const Border = styled.div`
  border: 1px solid ${theme.tertiary};
  margin: 0 30px;
  height: 115px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.tertiary};
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
  const accountStore = useAccountStore();
  const username = accountStore.account.info.member_username;

  const infoItemList: InfoItem[] = useMemo(() => {
    const accountInfo = accountStore.account.info;

    return [
      {
        infoType: "phone",
        logoImg: phoneImg,
        value: accountInfo.member_phone || "Not yet verified",
        isNotValid: !accountInfo.member_phone,
      },
      {
        infoType: "email",
        logoImg: emailImg,
        value: accountInfo.member_email || "Not yet set",
        isNotValid: !accountInfo.member_email,
      },
      {
        infoType: "birth",
        logoImg: birthImg,
        value: accountInfo.member_birthday || "Not yet set",
        isNotValid: !accountInfo.member_birthday,
      },
    ];
  }, [accountStore.account.info]);

  return (
    // @ts-ignore
    <InfoCardContainer {...props}>
      <AvatarContainer>
        <div className={".avatar"}>
          <img src={avatarImg} alt={"avatar"} />
        </div>
        {username}
      </AvatarContainer>

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
