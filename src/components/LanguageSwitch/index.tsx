import React, { useState } from "react";
import {
  FormControl as MuiFormControl,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from "@mui/material";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { BrandLanguage } from "@/types/stores/general";

const imageMap = {
  "en-US": process.env.PUBLIC_URL + `/assets/images/language/en-US.png`,
  "hi-IN": process.env.PUBLIC_URL + `/assets/images/language/hi-IN.png`,
  "id-ID": process.env.PUBLIC_URL + `/assets/images/language/id-ID.png`,
  "ja-JP": process.env.PUBLIC_URL + `/assets/images/language/ja-JP.png`,
  "ko-KR": process.env.PUBLIC_URL + `/assets/images/language/ko-KR.png`,
  "ta-IN": process.env.PUBLIC_URL + `/assets/images/language/ta-IN.png`,
  "tgl-PH": process.env.PUBLIC_URL + `/assets/images/language/tgl-PH.png`,
  "th-TH": process.env.PUBLIC_URL + `/assets/images/language/th-TH.png`,
  "vi-VN": process.env.PUBLIC_URL + `/assets/images/language/vi-VN.png`,
  "zh-CN": process.env.PUBLIC_URL + `/assets/images/language/zh-CN.png`,
  "zh-TW": process.env.PUBLIC_URL + `/assets/images/language/zh-TW.png`,
};

const StyledFormControl = styled(MuiFormControl)`
  border-radius: 10px;
  width: 100%;
  margin-right: 10px;
  overflow: visible;

  & label {
    color: #646973;
  }

  & input {
    color: ${({ theme }) => theme.white};
  }

  & .MuiSelect-root {
    overflow: visible;
  }

  .MuiOutlinedInput-input {
    padding: 12px !important;
  }
`;

const StyledSelect = styled(MuiSelect)`
  border: 1px solid ${({ theme }) => theme.tertiary};
  border-radius: 10px;
  overflow: visible;

  & .MuiSelect-select {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.tertiary} !important;

    & > img {
      margin-right: 10px;
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiSvgIcon-root {
    color: ${({ theme }) => theme.tertiary};
  }
`;

const StyledMenuItem = styled(MuiMenuItem)`
  //border-radius: 8px;
  background: red;

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
      <StyledSelect
        type={"string"}
        value={culturecode}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: (theme) => {
                return theme.palette.tertiary.dark;
              },

              "& .MuiMenuItem-root": {
                padding: 2,
              },
            },
          },
        }}
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
