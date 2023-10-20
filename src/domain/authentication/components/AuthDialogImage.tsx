import React from "react";
import authImage from "@/assets/images/auth/auth-image.png";
import styled from "styled-components";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";

const AuthDialogImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 80vh;

  & > .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LogoImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 165px;

  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {};
const AuthDialogImage = (props: Props) => {
  const { general } = useGeneralStore();

  return (
    <AuthDialogImageContainer>
      <img className={"bg"} src={authImage} alt={"welcome"} />
      <LogoImg src={general.brand && general.brand.loadingUrl} />
    </AuthDialogImageContainer>
  );
};

export default AuthDialogImage;
