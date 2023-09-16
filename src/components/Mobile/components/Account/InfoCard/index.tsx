import React, { CSSProperties, HTMLProps, useMemo } from "react";
import styled from "styled-components";
import avatarImg from "@/assets/images/account/avatar.png";
import phoneImg from "@/assets/images/account/icon_phone.png";
import emailImg from "@/assets/images/account/icon_email.png";
import birthImg from "@/assets/images/account/icon_birth.png";
import { themeList } from "@/theme";
import { ReactI18NextChild } from "react-i18next";

const theme = themeList["mobileT18"];

const InfoCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Border = styled.div`
  border: 1px solid ${theme.tertiary};
  margin: 0 30px;
  height: 115px;
`;

const AvatarContainer = styled.div``;

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
}

const InfoCard = (props: any) => {
  const infoItemList: InfoItem[] = useMemo(() => {
    return [
      {
        infoType: "phone",
        logoImg: phoneImg,
        value: "",
      },
      {
        infoType: "email",
        logoImg: emailImg,
        value: "liyibass@gmail.com",
      },
      {
        infoType: "birth",
        logoImg: birthImg,
        value: "",
      },
    ];
  }, []);
  return (
    // @ts-ignore
    <InfoCardContainer {...props}>
      <AvatarContainer>
        <div className={".avatar"}>
          <img src={avatarImg} alt={"avatar"} />
        </div>
        Tony
      </AvatarContainer>

      <Border />

      <InfoItemListContainer>
        {infoItemList.map((infoItem) => {
          const { logoImg, infoType, value } = infoItem;
          return (
            <InfoItemContainer key={infoType}>
              <div className={"logo"}>
                <img src={logoImg} alt={"avatar"} />
              </div>
              {value ? (
                <span>{value}</span>
              ) : (
                <span className={"unbound"}>Unbound</span>
              )}
            </InfoItemContainer>
          );
        })}
      </InfoItemListContainer>
    </InfoCardContainer>
  );
};

export default InfoCard;
