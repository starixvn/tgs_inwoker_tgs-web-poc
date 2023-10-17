import React from "react";
import styled from "styled-components";
import cardBonus from "@/assets/images/header/card_bonus.png";
import cardVip from "@/assets/images/header/card_vip.png";
import cardPromotions from "@/assets/images/header/card_promotions.png";
import { AppHistory } from "@/history/History";
import LanguageSwitch from "@/components/Mobile/components/LanguageSwitch";
import { Drawer } from "@mui/material";
import { DRAWER_WIDTH } from "@/contexts/headerContext";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/hooks/useRwd";

const CustomDrawer = styled(Drawer)`
  //height: calc(100% - 70px);
  //top: 80px !important;

  & .MuiPaper-root {
    background: linear-gradient(90deg, #181f2b 100%, #131922 100%) !important;
    padding: 12px 22px;
    width: 234px;
    //height: calc(100% - 70px);
    top: 80px !important;
    ${media.sm} {
      top: 60px !important;
    }
  }

  & .MuiBackdrop-root {
    //height: calc(100% - 70px);
    //top: 80px !important;
  }
`;
const DrawerCard = styled.div`
  width: 100%;
  margin-bottom: 8px;

  img {
    width: 100%;
  }
`;

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};
const MenuDrawer = ({ isOpen, handleClose }: Props) => {
  const { isDesktopSize } = useRwd();

  const handleEnterVip = () => {
    AppHistory.push("/vip");
    handleClose();
  };

  const handleEnterBettingBonus = () => {
    AppHistory.push("/betting-bonus");
    handleClose();
  };

  return (
    <CustomDrawer
      // variant={"persistent"}
      variant={isDesktopSize ? "persistent" : "temporary"}
      anchor={"left"}
      open={isOpen}
      onClose={handleClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
        },
      }}
    >
      <DrawerCard onClick={handleEnterVip}>
        <img src={cardVip} alt={"vip"} />
      </DrawerCard>

      <DrawerCard onClick={handleEnterBettingBonus}>
        <img src={cardBonus} alt={"bonus"} />
      </DrawerCard>

      <DrawerCard>
        <img src={cardPromotions} alt={"promotions"} />
      </DrawerCard>

      <LanguageSwitch />
    </CustomDrawer>
  );
};

export default MenuDrawer;
