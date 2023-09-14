import React from "react";
import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
import cardBonus from "@/assets/images/header/card_bonus.png";
import cardVip from "@/assets/images/header/card_vip.png";
import cardPromotions from "@/assets/images/header/card_promotions.png";

const CustomDrawer = styled(Drawer)`
  & .MuiPaper-root {
    background: linear-gradient(90deg, #181f2b 100%, #131922 100%) !important;
    padding: 12px 22px;
    width: 234px;
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
  return (
    <CustomDrawer anchor={"left"} open={isOpen} onClose={handleClose}>
      <DrawerCard>
        <img src={cardVip} alt={"vip"} />
      </DrawerCard>

      <DrawerCard>
        <img src={cardBonus} alt={"bonus"} />
      </DrawerCard>

      <DrawerCard>
        <img src={cardPromotions} alt={"promotions"} />
      </DrawerCard>
    </CustomDrawer>
  );
};

export default MenuDrawer;
