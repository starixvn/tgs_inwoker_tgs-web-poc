import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import Loading from "@/components/UI/Loading";
import BottomNote from "@/components/UI/BottomNote";
import { AccountService } from "@/services/AccountService";
import { TextField } from "@/components/UI/TextField";
import { FormControl, LabelContainer, ItemContainer } from "@/styles/forms";
import { Button } from "@/components/UI/Button";

const WeChat = () => {
  const { account, getAccountProfile } = useAccountStore();
  const { alert } = useNotifications();

  const [wechat, setWechat] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const isConfigured = !!account?.info.member_wechat;

    setWechat(account.info.member_wechat || "");
    setIsConfigured(isConfigured);
  }, [account.info]);

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWechat(e.target.value);
    onTextChanged();
  };

  const isDisableButton = () => {
    return !wechat;
  };

  const handleSubmitClicked = async () => {
    const wechatValue = wechat;
    // Validate WeChat here
    const re = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    if (!wechatValue.match(re)) {
      alert("", i18n.t("profile.wechat.msgInvalidWeChat"));
      return;
    }

    showLoading(true);

    try {
      // API call to update WeChat
      const response = await AccountService.UpdateIM(
        wechatValue,
        "wechat",
        "wechat"
      );

      //@ts-ignore
      if (response?.IsSuccess) {
        const responseUpdate = await getAccountProfile(true);
        if (responseUpdate?.IsSuccess) {
          setWechat(wechatValue);
          setIsConfigured(true);
        }
        alert("", i18n.t("common.msgSuccessUpdateProfile"));
        showLoading(false);
      } else {
        //@ts-ignore
        alert("", response?.msg);
        showLoading(false);
      }
    } catch (error: any) {
      alert("", error.message);
      showLoading(false);
    }
  };

  const showLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const onTextChanged = () => {
    // Handle text changes here
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <div>
      <ItemContainer>
        <LabelContainer>{i18n.t("common.wechatNumber")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            value={wechat}
            onChange={handleChangeNumber}
            placeholder={i18n.t("profile.wechat.plsEnterWechat")}
            disabled={
              isConfigured &&
              (config.features.ChangesNotAllowed ||
                config.features.Profile_ExistingDetails_ViewOnly)
            }
          />
        </FormControl>
      </ItemContainer>

      {isConfigured && config.features.ChangesNotAllowed ? (
        <div>
          <BottomNote
            text1={i18n.t("profile.wechat.toEdit")}
            link={"../chat"}
            text2={i18n.t("common.customerService")}
          />
        </div>
      ) : (
        <div>
          <Button
            fullWidth
            disabled={isDisableButton() || isLoading}
            onClick={handleSubmitClicked}
            style={{ marginBottom: "20px" }}
          >
            {i18n.t("common.submit")}
          </Button>

          <BottomNote
            text1={i18n.t("profile.wechat.toEdit")}
            link={
              config.features.ChangesNotAllowed ||
              config.features.Profile_ExistingDetails_ViewOnly
                ? "../chat"
                : "profile.wechat.here"
            }
          />
        </div>
      )}

      <Loading show={isLoading} />
    </div>
  );
};

export default WeChat;
