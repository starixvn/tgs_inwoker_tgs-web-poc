import React from "react";
import { Menu, MenuItem } from "@mui/material";
import i18n from "@/utils/i18n";
import ArrowDown from "@/assets/t18/images/arrowdown.svg";
import styled from "styled-components";

const ArrowDownImg = styled.img`
  height: 8px;
  margin-left: 10px;
  margin-right: 10px;
`;

const TheButtonWrapper = styled.div`
  padding-top: 14px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
`;

const LanguageChanger = ({ language, changeLanguage }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <TheButtonWrapper
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {i18n.t("lang." + i18n.language)}
        <ArrowDownImg src={ArrowDown} />
      </TheButtonWrapper>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {language.map((data, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                i18n.changeLanguage(data.culturecode);
                changeLanguage(data.culturecode);
                setAnchorEl(null);
                window.location.reload();
              }}
            >
              {i18n.t("lang." + data.culturecode)}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default LanguageChanger;
