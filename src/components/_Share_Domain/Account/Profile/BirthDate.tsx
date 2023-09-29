import React, { useState, useEffect } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import Button from "../../../Mobile/components/_PrevShare/Button";
import BottomNote from "../../../Mobile/components/_PrevShare/BottomNote";
import Header from "../../../Mobile/components/_PrevShare/Header";
import Loading from "../../../Mobile/components/_PrevShare/Loading";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import config from "@/config/config";
import { useAccountService } from "@/hooks/services/useAccountService";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";

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

const DatepickerWrapper = styled.div`
  padding: 40px 40px 0 40px;
`;

type CustomDatepickerProps = {
  disabled: boolean;
  brand: string;
};
const CustomDatepicker = styled.div<CustomDatepickerProps>`
  ${({ disabled }: CustomDatepickerProps) => {
    return disabled && `pointer-events: none;`;
  }}
  background: white;
  zoom: ${({ brand }) => (brand === "WGHK" ? "1.0" : "1.5")};
  padding: ${({ brand }) => (brand === "WGHK" ? "20px 20px" : "10px 20px")};
  border-radius: 8px;
  margin-top: 10px;

  .MuiInputBase-input {
    background: none;
    ${({ brand }) =>
      brand === "WGHK" ? `font-size: 28px; font-weight: 400;` : ``}
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

const CustomLabel = styled.div`
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }: any) => theme.secondary};
`;

const Birthdate = () => {
  const { alert } = useNotifications();
  const { account, getAccountProfile } = useAccountStore();
  const AccountService = useAccountService();

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
      <Header
        background={true}
        token={null}
        balance={0}
        onBackClick={() => history.goBack()}
        title={i18n.t("profile.birthdate.title")}
        noBack={false}
      ></Header>
      <DatepickerWrapper>
        <CustomLabel>{i18n.t("profile.birthdate.title")}</CustomLabel>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
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
        </MuiPickersUtilsProvider>
      </DatepickerWrapper>
      {isConfigured && config.features.Profile_SetUpBirthdateOnce ? (
        <BottomNote
          text1={i18n.t("profile.birthdate.toEdit")}
          link={"../chat"}
          text2={i18n.t(
            config.features.Profile_SetUpBirthdateOnce
              ? "common.customerService"
              : "profile.birthdate.here"
          )}
        ></BottomNote>
      ) : (
        birthdate !== account.info.member_birthdate && i18n.t("common.complete")
      )}
      {message}
      <Button
        disabled={isDisableButton() || loading}
        onClick={handleSubmitClicked}
        label={i18n.t("common.submit")}
      ></Button>
    </Container>
  );
};

export default Birthdate;
