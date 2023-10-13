import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import BottomNote from "@/components/Mobile/components/UI/BottomNote";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import config from "@/config/config";
import { AccountService } from "@/services/AccountService";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import {
  ItemContainer,
  LabelContainer,
} from "@/components/Mobile/styles/forms";
import { Button } from "@/components/Mobile/components/UI/Button";

const moment = require("moment");
const localeMap: { [key in string]: Locale } = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

type CustomDatepickerProps = {
  disabled: boolean;
  brand: string;
};
const CustomDatepicker = styled.div<CustomDatepickerProps>`
  ${({ disabled }: CustomDatepickerProps) => {
    return disabled && `pointer-events: none;`;
  }}
  background: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.tertiary};

  .MuiInputBase-input {
    background: none;
    color: ${({ theme }) => theme.white};
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

const Birthdate = () => {
  const { alert } = useNotifications();
  const { account, getAccountProfile } = useAccountStore();

  const history = useHistory();

  const [birthdate, setBirthdate] = useState<string>(
    moment(
      account.info.member_birthdate ? account.info.member_birthdate : new Date()
    ).format("YYYY/MM/DD")
  );

  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const isConfigured = !!account.info.member_birthdate;

    setIsConfigured(isConfigured);
    setBirthdate(account.info.member_birthdate || "");
  }, [account]);

  const handleChangeNumber = async (e: Date | null) => {
    if (moment(e).isAfter(new Date())) {
      setBirthdate(moment(new Date()).format("YYYY/MM/DD"));
    } else {
      setBirthdate(moment(e!).format("YYYY/MM/DD"));
    }
    onTextChanged();
  };

  const isDisableButton = () => {
    return !birthdate;
  };

  const handleSubmitClicked = async () => {
    showLoading(true);

    // API call
    try {
      const response = await AccountService.SetBirthDate(birthdate);
      if (response.IsSuccess) {
        const responseUpdate = await getAccountProfile(true);
        if (responseUpdate?.IsSuccess) {
          setIsConfigured(true);
        }

        alert("", i18n.t("common.msgSuccessUpdateProfile"));
        showLoading(false);
      } else {
        //@ts-ignore
        alert("", response.msg);
        showLoading(false);
      }
    } catch (err: any) {
      //@ts-ignore
      alert("", err.message);
      showLoading(false);
    }
  };

  const onTextChanged = () => {
    setMessage("");
  };

  const showLoading = (loading: boolean) => {
    setLoading(loading);
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <ItemContainer>
        <LabelContainer>{i18n.t("profile.birthdate.title")}</LabelContainer>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          locale={localeMap[i18n.language.substring(0, 2)]}
        >
          <CustomDatepicker
            brand={config.brand}
            disabled={
              isConfigured && config.features.Profile_SetUpBirthdateOnce
            }
          >
            <DatePicker
              maxDate={new Date()}
              invalidDateMessage={false}
              format="yyyy/MM/dd"
              value={birthdate}
              onChange={(e) => handleChangeNumber(e)}
            />
          </CustomDatepicker>
        </LocalizationProvider>
      </ItemContainer>

      <ItemContainer>
        {isConfigured && config.features.Profile_SetUpBirthdateOnce ? (
          <BottomNote
            text1={i18n.t("profile.birthdate.toEdit")}
            link={"../chat"}
            text2={i18n.t(
              config.features.Profile_SetUpBirthdateOnce
                ? "common.customerService"
                : "profile.birthdate.here"
            )}
          />
        ) : (
          birthdate !== account.info.member_birthdate && (
            <BottomNote text1={i18n.t("common.complete")} />
          )
        )}
        {message}
      </ItemContainer>

      <Button
        fullWidth
        disabled={isDisableButton() || loading}
        onClick={handleSubmitClicked}
      >
        {i18n.t("common.submit")}
      </Button>
    </Container>
  );
};

export default Birthdate;
