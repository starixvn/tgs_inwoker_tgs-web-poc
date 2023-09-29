import React from "react";
import maintenanceBg from "@/assets/images/maintenance/maintenance_bg.png";
import styled from "styled-components";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const MaintenanceContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px - 82px);
  position: relative;
`;
const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MessageContainer = styled.div`
  color: ${theme.white};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: 5.72%;
  left: 9.8%;
`;

type Props = {};
const Maintenance = (props: Props) => {
  return (
    <MaintenanceContainer>
      <BackgroundContainer>
        <img src={maintenanceBg} alt={"maintenance"} />
      </BackgroundContainer>

      <MessageContainer>YOYO</MessageContainer>
    </MaintenanceContainer>
  );
};

export default Maintenance;
