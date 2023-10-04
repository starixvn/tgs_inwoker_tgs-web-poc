import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import BottomNav, { BottomNavItem } from "./BottomNav";
import { AppHistory } from "@/history/History";
import { useRoute } from "@/components/Mobile/hooks/useRoute";
import { RouteCategoryEnum } from "@/components/Mobile/router";
import I18n from "@/utils/i18n";
import i18n from "@/utils/i18n";
import { useGetBottomNavItemList } from "@/components/Mobile/components/BottomAppBar/hooks/useGetBottomNavItemList";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: 82px;
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: #181f2b;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
`;

const BottomAppBar = () => {
  const { bottomNavItemList, selectedBottomNavItem, handleClickBottomNavItem } =
    useGetBottomNavItemList();

  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.label}
            bottomNavItem={bottomNavItem}
            onClick={() => handleClickBottomNavItem(bottomNavItem)}
            isSelected={selectedBottomNavItem?.label === bottomNavItem.label}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;
