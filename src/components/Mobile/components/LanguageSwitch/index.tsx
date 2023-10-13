import React, { useMemo, useState } from "react";
import {
  FormControl as MuiFormControl,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from "@mui/material";
import styled from "styled-components";
import iconImg from "@/assets/images/account/icon_uk.png";
import { themeList } from "@/theme";
import i18n from "@/utils/i18n";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { BrandLanguage } from "@/types/general";

const imageMap = {
  "zh-CN": process.env.PUBLIC_URL + `/assets/images/language/zh-CN.png`,
  "zh-TW": process.env.PUBLIC_URL + `/assets/images/language/zh-TW.png`,
  "en-US": process.env.PUBLIC_URL + `/assets/images/language/en-US.png`,
  "th-TH": process.env.PUBLIC_URL + `/assets/images/language/th-TH.png`,
  "vi-VN": process.env.PUBLIC_URL + `/assets/images/language/vi-VN.png`,
  "id-ID": process.env.PUBLIC_URL + `/assets/images/language/id-ID.png`,
};

const theme = themeList["mobileT18"];

const StyledFormControl = styled(MuiFormControl)`
  border-radius: 10px;
  width: 100%;
  margin-right: 10px;
  overflow: visible;

  & label {
    color: #646973;
  }

  & input {
    color: ${theme.white};
  }

  & .MuiSelect-root {
    overflow: visible;
  }

  .MuiOutlinedInput-input {
    padding: 12px !important;
  }
`;

const StyledSelect = styled(MuiSelect)`
  border: 1px solid ${theme.tertiary};
  border-radius: 10px;
  overflow: visible;

  & .MuiSelect-root {
    display: flex;
    align-items: center;
    color: ${theme.tertiary} !important;

    & > img {
      margin-right: 10px;
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const StyledMenuItem = styled(MuiMenuItem)`
  //background: #212937;
  //border-radius: 8px;
  //background-color: red;

  & > img {
    margin-right: 10px;
  }
`;

const FlagContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LanguageSwitch = () => {
  const { general } = useGeneralStore();
  const languageList = general.brandLanguage;

  const [currentLanguage, setCurrentLanguage] = useState<BrandLanguage>({
    culturecode: i18n.language,
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedLanguage = languageList.find(
      (languageItem) => languageItem.culturecode === event.target.value
    );

    setCurrentLanguage(selectedLanguage || null);
    i18n.changeLanguage(selectedLanguage.culturecode);
    window.location.reload();
  };

  const culturecode = currentLanguage?.culturecode || "";

  if (languageList.length < 2) return null;
  return (
    <StyledFormControl variant="outlined">
      {/*<InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>*/}
      <StyledSelect
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={culturecode}
        onChange={handleChange}
        label="Age"
      >
        {languageList.length > 1 &&
          languageList.map((languageItem) => {
            const { culturecode } = languageItem;
            return (
              <StyledMenuItem key={culturecode} value={culturecode}>
                <FlagContainer>
                  <img src={imageMap[culturecode]} alt={culturecode} />
                </FlagContainer>
                {i18n.t("lang." + culturecode)}
              </StyledMenuItem>
            );
          })}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default React.memo(LanguageSwitch);
