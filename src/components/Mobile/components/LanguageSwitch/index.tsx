import React, { useMemo, useState } from "react";
import {
  FormControl as MuiFormControl,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import styled from "styled-components";
import iconImg from "@/assets/images/account/icon_uk.png";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const StyledFormControl = styled(MuiFormControl)`
  background: ${theme.tertiaryDark};
  border-radius: 8px;
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
`;

const StyledSelect = styled(MuiSelect)`
  background: ${theme.primaryDark};
  border: 1px solid ${theme.tertiary};
  border-radius: 8px;
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

interface languageItem {
  label: string;
  value: string;
  icon: string;
}

const LanguageSwitch = () => {
  const languageList = useMemo<languageItem[]>(() => {
    return [
      {
        label: "English",
        value: "english",
        icon: iconImg,
      },
      {
        label: "繁體中文",
        value: "zh-tw",
        icon: iconImg,
      },
    ];
  }, []);

  const [currentLanguage, setCurrentLanguage] = useState<languageItem | null>(
    languageList[0]
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedLanguage = languageList.find(
      (languageItem) => languageItem.value === event.target.value
    );

    setCurrentLanguage(selectedLanguage || null);
  };

  const value = currentLanguage?.value || "";

  return (
    <StyledFormControl variant="outlined">
      {/*<InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>*/}
      <StyledSelect
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label="Age"
      >
        {languageList.map((languageItem) => {
          const { label, value, icon } = languageItem;
          return (
            <StyledMenuItem key={label} value={value}>
              <img src={icon} alt={label} />
              {label}
            </StyledMenuItem>
          );
        })}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default React.memo(LanguageSwitch);
