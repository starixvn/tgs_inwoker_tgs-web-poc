import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import BottomNote from "@/components/UI/BottomNote";
import Loading from "@/components/UI/Loading";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import config from "@/config/config";
import { AccountService } from "@/services/AccountService";
import { ItemContainer, LabelContainer } from "@/styles/forms";
import { SubmitButton } from "@/styles/forms";
import DatePicker from "@/components/UI/DatePicker";

const moment = require("moment");

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Birthdate = () => {
  const { alert } = useNotifications();
  const { account, getAccountProfile } = useAccountStore();

  const [birthdate, setBirthdate] = useState<string>(
    moment(
      account.info.member_birthdate ? account.info.member_birthdate : new Date()
    ).format("YYYY/MM/DD")
  );

  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(loading);
  };
  return (
    <Container>
      <ItemContainer>
        <LabelContainer>{i18n.t("profile.birthdate.title")}</LabelContainer>
        <DatePicker
          disabled={isConfigured && config.features.Profile_SetUpBirthdateOnce}
          invalidDateMessage={false}
          format="yyyy/MM/dd"
          value={new Date(birthdate)}
          onChange={(e) => handleChangeNumber(e)}
        />
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

      <SubmitButton
        fullWidth
        disabled={isDisableButton() || isLoading}
        onClick={handleSubmitClicked}
      >
        {i18n.t("common.submit")}
      </SubmitButton>

      <Loading show={isLoading} />
    </Container>
  );
};

export default Birthdate;
