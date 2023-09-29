import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import i18n from "@/utils/i18n";
import { AccountService } from "@/api-services/services/AccountService";
import config from "@/config/config";
import Textbox from "../../../Mobile/components/_PrevShare/Textbox";
import Button from "../../../Mobile/components/_PrevShare/Button";
import BottomNote from "../../../Mobile/components/_PrevShare/BottomNote";
import { useNotifications } from "@/hooks/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import Loading from "@/components/Mobile/components/UI/Loading";

const QQ = () => {
  const { account, getAccountProfile } = useAccountStore();
  const { alert } = useNotifications();

  const [qq, setQQ] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const isConfigured = Boolean(account?.info.member_qq);

    setQQ(account.info.member_qq || "");
    setIsConfigured(isConfigured);
  }, [account.info]);

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQQ(e.target.value);
    onTextChanged();
  };

  const handleSubmitClicked = () => {
    const qqValue = qq;
    // Validate QQ number here
    const re = new RegExp("^[1-9]\\d{4,14}$");
    if (!qqValue.match(re)) {
      alert("", i18n.t("profile.qq.msgInvalidQQ"));
      return;
    }

    showLoading(true);

    // API call to update QQ
    AccountService.UpdateIM(qqValue, "qq", "qq")
      .then((response) => {
        //@ts-ignore
        if (response?.IsSuccess) {
          getAccountProfile(true).then((responseUpdate) => {
            //@ts-ignore
            if (responseUpdate?.IsSuccess) {
              setQQ(qqValue);
              setIsConfigured(true);
            }
            alert("", i18n.t("common.msgSuccessUpdateProfile"));
            showLoading(false);
          });
        } else {
          //@ts-ignore
          alert("", response?.msg);
          showLoading(false);
        }
      })
      .catch((err) => {
        alert("", err.message);
        showLoading(false);
      });
  };

  const showLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const onTextChanged = () => {
    // Handle text changes here
  };

  const checkButtonState = () => {
    // Handle button state logic here
    return false; // Placeholder logic, replace with actual logic
  };

  const handleBackClick = () => {
    history.goBack();
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={qq}
        onChange={handleChangeNumber}
        placeholder={i18n.t("profile.qq.plsEnterQQ")}
        disabled={
          isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        }
        type={"text"}
        label={i18n.t("common.qqNumber")}
        isCustomProfileStyle={config.brand === "WGHK"}
      />

      {isConfigured && config.features.ChangesNotAllowed ? (
        <div>
          <BottomNote
            text1={i18n.t("profile.qq.toEdit")}
            link={"../chat"}
            text2={i18n.t("common.customerService")}
          />
        </div>
      ) : (
        <div>
          <Button
            disabled={checkButtonState() || loading}
            onClick={handleSubmitClicked}
            label={i18n.t("common.submit")}
          />

          <BottomNote
            text1={i18n.t("profile.qq.toEdit")}
            link={
              config.features.ChangesNotAllowed ||
              config.features.Profile_ExistingDetails_ViewOnly
                ? "../chat"
                : "profile.qq.here"
            }
          />
        </div>
      )}
    </div>
  );
};

export default QQ;
