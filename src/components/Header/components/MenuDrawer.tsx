import React from "react";
import styled from "styled-components";
import cardBonus from "@/assets/t18/images/header/card_bonus.png";
import cardVip from "@/assets/t18/images/header/card_vip.png";
import cardPromotions from "@/assets/t18/images/header/card_promotions.png";
import cardHome from "@/assets/t18/images/header/card_home.png";
import { AppHistory } from "@/history/History";
import LanguageSwitch from "@/components/LanguageSwitch";
import { Drawer } from "@mui/material";
import { DRAWER_WIDTH } from "@/contexts/headerContext";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/hooks/useRwd";

import iconHome from "@/assets/t18/images/header/home.svg";
import iconPromotion from "@/assets/t18/images/header/promotion.svg";
import iconDownload from "@/assets/t18/images/header/app_download.svg";
import Icon from "@/components/Icon";
import i18n from "@/utils/i18n";
import { useHeader } from "@/hooks/useHeader";

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
  cursor: pointer;
  width: 100%;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.tertiaryDark};
  border-radius: 12px;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 1.375rem;
  line-height: 1.611rem;
  font-weight: 700;

  & > .icon {
    margin-right: 10px;
  }
`;

const DrawerImageCard = styled(DrawerCard)`
  padding: 0;
  img {
    width: 100%;
  }
`;

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isDesktopSize } = useRwd();

  const handleDrawerClose = () => {
    if (isDesktopSize) return;
    handleToggleMenu(false);
  };

  const handleClickHome = () => {
    AppHistory.push("/");
    handleDrawerClose();
  };

  const handleEnterVip = () => {
    AppHistory.push("/vip");
    handleDrawerClose();
  };

  const handleEnterBettingBonus = () => {
    AppHistory.push("/betting-bonus");
    handleDrawerClose();
  };

  const handleClickPromotion = () => {
    AppHistory.push("/promotion-list");
    handleDrawerClose();
  };

  return (
    <CustomDrawer
      // variant={"persistent"}
      variant={isDesktopSize ? "persistent" : "temporary"}
      anchor={"left"}
      open={isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
        },
      }}
    >
      {isDesktopSize && (
        <DrawerCard onClick={handleClickHome}>
          <Icon
            className={"icon"}
            iconUrl={iconHome}
            width={"31px"}
            height={"31px"}
          />
          {i18n.t("common.home")}
        </DrawerCard>
      )}

      <DrawerImageCard onClick={handleEnterVip}>
        <img src={cardVip} alt={"vip"} />
      </DrawerImageCard>

      <DrawerImageCard onClick={handleEnterBettingBonus}>
        <img src={cardBonus} alt={"bonus"} />
      </DrawerImageCard>

      <DrawerCard onClick={handleClickPromotion}>
        <Icon
          className={"icon"}
          iconUrl={iconPromotion}
          width={"31px"}
          height={"31px"}
        />
        {i18n.t("common.promotion")}
      </DrawerCard>

      <LanguageSwitch />
    </CustomDrawer>
  );
};

export default MenuDrawer;
