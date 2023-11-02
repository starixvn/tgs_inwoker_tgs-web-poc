import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { AccountService } from "@/api-services/services/AccountService";
import { Textfit } from "react-textfit";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { GrayInputWrapper, TextField } from "@/components/UI/TextField";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";

const Wrapper = styled.div`
  width: 100%;
`;

const CustomDialog = styled(Dialog)`
  & .MuiPaper-root {
    max-width: 400px;
    width: 100%;
    height: auto;
    min-height: 100px;
    background: ${({ theme }) => theme.primaryLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin: 0;
    overflow: visible;
    position: relative;
  }
  .MuiPaper-rounded {
    border-radius: 20px;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  width: 100%;
  text-align: center;
  padding: 30px 10px 20px 10px;
  font-weight: bold;
`;

const InputRow = styled.div`
  display: grid;
  gap: 5px;
  padding: 5px 30px;
  grid-template-columns: 30% 70%;

  select, input {
    height: 25px;
  }
`;

const AnotherRow = styled.div`
  padding: 5px 30px;
  display: grid;
  gap: 5px;
  grid-template-columns: 70% 30%;

  select, input {
    height: 25px;
  }
`;

const ButtonRow = styled.div`
  padding: 10px 30px;
  height: 100px;
  width: 100%;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  select {
    padding: 14px !important;
  }
`;

type ForcedVerificationProps = {
  forceVerify: boolean;
};

const ForcedVerification = ({ forceVerify }: ForcedVerificationProps) => {
  const { alert } = useNotifications();
  const [open, setOpen] = useState(forceVerify);
  const [areaCode, setAreacode] = useState(config.features.PhonePrefix);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [securityKey, setSecurityKey] = useState<string>("");

  const handleGetCodeClick = async () => {
    if (countdown <= 0) {
      var expr = new RegExp(
        `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
      );
      if (!expr.test(phone)) {
        alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }

      AccountService.NewRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areaCode,
          phone: phone,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          setSecurityKey(response.data.stepResponse);
          alert("", i18n.t("common.msgTokenSent"));
          setCountdown(60);
        } else {
          alert("", response.info);
        }
      });
    }
  };

  function smsVerification(securityKey: string, code: string) {
    AccountService.NewRegister("InitPhone", {
      input: "Valid",
      data: {
        securitykey: securityKey,
        validatecode: code,
      },
    }).then(async (response) => {
      if (response.IsSuccess) {
        alert("", i18n.t("common.msgTokenVerified"));
        setOpen(false);
      } else {
        alert("", response.info);
      }
    });
  }

  const handleActivationClick = async () => {
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );
    if (!expr.test(phone)) {
      alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH)
      );
      return;
    }
    if (!config.features.SkipSMSVerification) {
      expr = /^[a-zA-Z0-9]{6}$/;
      if (!expr.test(code)) {
        alert("", i18n.t("common.msgEnterCode"));
        return;
      }
    }

    if (config.features.SkipSMSVerification) {
      AccountService.NewRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areaCode,
          phone: phone,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          smsVerification(response.data, "123456");
        } else {
          alert("", response.info);
        }
      });
    } else {
      smsVerification(securityKey, code);
    }
  };

  useEffect(() => {
    if (countdown > 0)
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);

  return (
    <CustomDialog open={open} maxWidth="" fullWidth="xs">
      <Wrapper>
        <Title>{i18n.t("web.register.activation")}</Title>
        <InputRow>
          <GrayInputWrapper >
            <CustomSelect style={{ width: "100%"}} native>
              <option>{areaCode}</option>
            </CustomSelect>
          </GrayInputWrapper>
          <GrayInputWrapper>
            <TextField
              type="text"
              value={phone}
              placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </GrayInputWrapper>
        </InputRow>
        {!config.features.SkipSMSVerification && (
          <AnotherRow>
            <GrayInputWrapper>
            <TextField
              type="text"
              value={code}
              placeholder={i18n.t("common.msgEnterCode")}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            </GrayInputWrapper>
            <Button onClick={handleGetCodeClick} disabled={countdown > 0} >
              <Textfit>
                {countdown <= 0
                  ? i18n.t("common.msgSendToken")
                  : i18n.t("common.btnTokenResendLabel") +
                    "(" +
                    countdown +
                    "s)"}
              </Textfit>
            </Button>
          </AnotherRow>
        )}
        <ButtonRow>
          <Button onClick={handleActivationClick} style={{width: "100%"}}>
            {i18n.t("common.submit")}
          </Button>
        </ButtonRow>
      </Wrapper>
    </CustomDialog>
  );
};

export default ForcedVerification;
