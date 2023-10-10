import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import TextboxWithButton from "../../../Mobile/components/_PrevShare/TextboxWithButton";
import BottomNote from "../../../Mobile/components/_PrevShare/BottomNote";
import Header from "../../../Mobile/components/_PrevShare/Header";
import Loading from "@/components/Mobile/components/UI/Loading";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { AccountService } from "@/services/AccountService";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SelectContainer = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  color: #000;
  font-size: 30px;
  background-color: #fff;
`;

const CustomText = styled.div`
  padding: 20px 20px 0 20px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgb(58 58 58 / 20%);
  border-radius: 20px;
`;

const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
`;

const CustomInput = styled.input`
  height: 50px;
  font-size: 28px;
  margin-top: 18px;
  border-radius: 16px;
  padding: 16px 32px;
  font-weight: 500;
  border: 0;
  display: flex;
  flex: 1;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }

  &:disabled {
    background: #fff;
    opacity: 1;
  }
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
    <Container>
      <Header
        background={true}
        token={null}
        balance={0}
        onBackClick={() => history.goBack()}
        title={i18n.t("common.phoneNumber")}
        noBack={cannotAccessOther}
      ></Header>
      <CustomText>
        <CustomLabel>{i18n.t("common.phoneNumber")}</CustomLabel>
        <Container
          style={{
            float: "left",
            padding: "10px",
          }}
        >
          <SelectContainer
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
          </SelectContainer>
        </Container>
        <CustomInput
          type={"text"}
          value={phone}
          placeholder={i18n.t("common.msgEnterPhone")}
          disabled={
            (isConfigured ? isConfigured : false) ||
            config.features.Profile_DisableVerifyPhone
          }
          onChange={handleChangePhone}
          maxLength={config.features.MAX_PHONE_LENGTH || 10}
        ></CustomInput>
      </CustomText>
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
              <TextboxWithButton
                buttonlabel={
                  countdownToken <= 0
                    ? i18n.t("common.msgSendToken")
                    : `${i18n.t(
                        "common.btnTokenResendLabel"
                      )}(${countdownToken}s)`
                }
                style={{ margin: "20px auto 20px auto" }}
                value={code}
                onChange={handleChangeCode}
                placeholder={i18n.t("common.msgEnterPhoneCode")}
                label={i18n.t("common.token")}
                onClick={handleGetCodeClick}
              ></TextboxWithButton>
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
          ></BottomNote>
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
          ></BottomNote>
        )
      ) : null}
    </Container>
  );
}

export default Phone;
