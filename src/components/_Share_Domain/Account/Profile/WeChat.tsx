import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import Textbox from "../../../Mobile/components/_PrevShare/Textbox";
import Button from "../../../Mobile/components/_PrevShare/Button";
import { useNotifications } from "@/hooks/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import Loading from "@/components/Mobile/components/UI/Loading";
import BottomNote from "@/components/Mobile/components/_PrevShare/BottomNote";
import { useAccountService } from "@/hooks/services/useAccountService";

const WeChat = () => {
  const { account, getAccountProfile } = useAccountStore();
  const AccountService = useAccountService();
  const { alert } = useNotifications();

  const [wechat, setWechat] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(loading);
  };

  const onTextChanged = () => {
    // Handle text changes here
  };

  const handleBackClick = () => {
    history.goBack();
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={wechat}
        onChange={handleChangeNumber}
        placeholder={i18n.t("profile.wechat.plsEnterWechat")}
        label={i18n.t("common.wechatNumber")}
        disabled={
          isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        }
        isCustomProfileStyle={config.brand === "WGHK"}
      />

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
            disabled={isDisableButton() || loading}
            onClick={handleSubmitClicked}
            label={i18n.t("common.submit")}
          />

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
    </div>
  );
};

export default WeChat;
