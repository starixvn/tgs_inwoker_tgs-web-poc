import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import BottomNote from "@/components/Mobile/components/UI/BottomNote";
import Loading from "@/components/Mobile/components/UI/Loading";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { AccountService } from "@/services/AccountService";
import TextFieldWithButton from "@/components/Mobile/components/UI/TextFieldWithButton";
import {
  FormControl,
  LabelContainer,
  ItemContainer,
} from "@/components/Mobile/styles/forms";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import { Select } from "@/components/Mobile/components/UI/Select";

const PhoneContainer = styled.div`
  display: flex;
  gap: 8px;
`;

function Phone() {
  const { account, newRegister, getRegisterStatus, getAccountInfo } =
    useAccountStore();
  const history = useHistory();
  const { alert } = useNotifications();

  const [countdownToken, setCountdownToken] = useState(0);
  const [areacode, setAreacode] = useState(config.features.PhonePrefix);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [securityKey, setSecurityKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const isConfigured = !!(
      account.info.check_pass_phone && account.info.member_phone
    );

    if (account.info.check_pass_phone && account.info.member_phone) {
      setPhone(isConfigured ? account.info.member_phone : "");
    }
    setCode("");
    setIsNew(!account.info.check_pass_phone);
    setIsConfigured(isConfigured);
  }, [account.info]);

  const handleChangePhone = (e: ChangeEvent<any>) => {
    setPhone(e.target.value);
    if (
      (config.features.Register_CustomFlow_IDR && !account.registercompleted) ||
      config.features.InitPhone_WithoutVerify
    ) {
      onTextChanged();
    }
  };

  const handleChangeCode = (e: ChangeEvent<any>) => {
    setCode(e.target.value);
    onTextChanged();
  };

  const checkCountdownToken = () => {
    if (countdownToken > 0) {
      setCountdownToken(countdownToken - 1);
      setTimeout(() => {
        checkCountdownToken();
      }, 1000);
    }
  };

  const handleGetCodeClick = async () => {
    if (countdownToken > 0) return;
    if (!phone) return showErrorMessage(i18n.t("common.msgEnterPhone"));
    if (
      phone.length < 8 ||
      phone.length > (config.features.MAX_PHONE_LENGTH || 10)
    ) {
      alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`)
      );
      return;
    }

    setLoading(true);

    try {
      const response = await newRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areacode,
          phone: phone,
        },
      });

      //@ts-ignore
      if (response.IsSuccess) {
        setCountdownToken(60);
        //@ts-ignore
        setSecurityKey(response.data);
        showInfoMessage(i18n.t("common.msgTokenSent"));
        setTimeout(() => {
          checkCountdownToken();
        }, 1000);
      } else {
        //@ts-ignore
        showErrorMessage(response.info);
      }
    } catch (error: any) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isDisableButton = () => {
    return (
      (config.features.Register_CustomFlow_IDR &&
        !account.registercompleted &&
        !phone) ||
      !(code && phone)
    );
  };

  const onTextChanged = () => {
    if (message != null && message.length > 0) {
      setMessage(""); // clear
    }
  };

  const showErrorMessage = (msg?: string | null) => {
    alert("", msg || "");
  };

  const showInfoMessage = (msg?: string | null) => {
    alert("", msg || "");
  };

  const handleSubmitClicked = async () => {
    setLoading(true);

    try {
      if (
        (config.features.Register_CustomFlow_IDR &&
          !account.registercompleted) ||
        config.features.InitPhone_WithoutVerify
      ) {
        const response = await getRegisterStatus();

        if (response?.IsSuccess) {
          var currentStepKey = response.data;
          if (currentStepKey === "SetPhoneDontCareDuplicate") {
            const responseSetPhone = await newRegister(
              "SetPhoneDontCareDuplicate",
              {
                areacode: areacode,
                phone: phone,
              }
            );

            if (responseSetPhone?.IsSuccess) {
              const responseUpdate = await getAccountInfo();

              if (responseUpdate?.IsSuccess) {
                if (
                  responseUpdate.data.email === null &&
                  !responseUpdate.data.registercompleted
                ) {
                  history.push({
                    pathname: "/profile/email",
                    state: { forced: true },
                  });
                } else {
                  setCode("");
                  setSecurityKey("");
                  setCountdownToken(0);
                  setIsNew(false);
                  setIsConfigured(true);
                }
              }
            } else {
              showErrorMessage(responseSetPhone?.info || "");
            }
          }
        } else {
          const responseInitPhone = await newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          });

          if (responseInitPhone?.IsSuccess) {
            const responseValid = await newRegister("InitPhone", {
              input: "Valid",
              data: {
                securitykey: responseInitPhone.data.stepResponse,
                validatecode: "123456", // You might need to replace this
              },
            });

            if (responseValid?.IsSuccess) {
              const responseUpdate = await getAccountInfo();

              if (responseUpdate?.IsSuccess) {
                if (
                  responseUpdate.data.email === null &&
                  !responseUpdate.data.registercompleted
                ) {
                  history.push({
                    pathname: "/profile/email",
                    state: { forced: true },
                  });
                } else {
                  setCode("");
                  setSecurityKey("");
                  setCountdownToken(0);
                  setIsNew(false);
                  setIsConfigured(true);
                }
              }
            } else {
              showErrorMessage(responseValid?.info);
            }
          } else {
            showErrorMessage(responseInitPhone?.info);
          }
        }
      } else {
        const response = await AccountService.UpdatePhone(securityKey, code);

        //@ts-ignore
        if (response?.IsSuccess) {
          const responseUpdate = await getAccountInfo();

          if (responseUpdate?.IsSuccess) {
            setCode("");
            setSecurityKey("");
            setCountdownToken(0);
            setIsNew(false);
            setIsConfigured(true);
          }
        } else {
          showErrorMessage(response?.info);
        }
      }
    } catch (error: any) {
      showErrorMessage(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const cannotAccessOther =
    //@ts-ignore
    history.location.state && history.location.state.forced ? true : "";

  if (loading) return <Loading />;

  return (
    <>
      <ItemContainer>
        <LabelContainer>{i18n.t("common.phoneNumber")}</LabelContainer>

        <PhoneContainer>
          <FormControl variant="outlined" style={{ width: "30%" }}>
            <Select
              native
              value={areacode}
              onChange={(e) => {
                setAreacode(e.target.value);
              }}
              disabled={
                (isConfigured ? isConfigured : false) ||
                (config.features.Profile_DisableVerifyPhone &&
                  !config.features.InitPhone_WithoutVerify)
              }
            >
              <option value={config.features.PhonePrefix}>
                {config.features.PhonePrefix}
              </option>
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <TextField
              type={"text"}
              value={phone}
              placeholder={i18n.t("common.msgEnterPhone")}
              disabled={
                (isConfigured ? isConfigured : false) ||
                config.features.Profile_DisableVerifyPhone
              }
              onChange={handleChangePhone}
              maxLength={config.features.MAX_PHONE_LENGTH || 10}
            />
          </FormControl>
        </PhoneContainer>
      </ItemContainer>

      {(() => {
        if (
          !(
            config.features.Register_CustomFlow_IDR &&
            !account.registercompleted
          ) &&
          !isConfigured
        ) {
          return (
            !config.features.Profile_DisableVerifyPhone &&
            !config.features.InitPhone_WithoutVerify && (
              <ItemContainer>
                <LabelContainer>{i18n.t("common.token")}</LabelContainer>
                <FormControl variant="outlined">
                  <TextFieldWithButton
                    buttonlabel={
                      countdownToken <= 0
                        ? i18n.t("common.msgSendToken")
                        : `${i18n.t(
                            "common.btnTokenResendLabel"
                          )}(${countdownToken}s)`
                    }
                    value={code}
                    onChange={handleChangeCode}
                    placeholder={i18n.t("common.msgEnterPhoneCode")}
                    onClick={handleGetCodeClick}
                  />
                </FormControl>
              </ItemContainer>
            )
          );
        }
      })()}

      {isConfigured || config.features.InitPhone_WithoutVerify ? (
        config.features.Profile_DisableEditPhone ? (
          <BottomNote
            text1={i18n.t("profile.phone.toEdit")}
            link={"../chat"}
            text2={i18n.t("common.customerService")}
          />
        ) : (
          <BottomNote
            text1={i18n.t("profile.phone.toEdit")}
            link={
              config.features.ChangesNotAllowed ||
              config.features.Profile_ExistingDetails_ViewOnly
                ? "../chat"
                : "./changephone"
            }
            text2={i18n.t(
              config.features.ChangesNotAllowed ||
                config.features.Profile_ExistingDetails_ViewOnly
                ? "common.customerService"
                : "profile.phone.here"
            )}
          />
        )
      ) : null}
    </>
  );
}

export default Phone;
