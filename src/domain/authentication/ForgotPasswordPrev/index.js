import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { AccountService } from "@/api-services/services/AccountService";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import TextFieldWithButton from "@/components/UI/TextFieldWithButton";
import { Button } from "@/components/UI/Button";
import { GrayInputWrapper, TextField } from "@/components/UI/TextField";
import { Select } from "@/components/UI/Select";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  ${media.sm} {
    padding: 42px 42px;
  }
`;

const PhoneContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: stretch;
  margin-bottom: 21px;
  overflow: visible;
`;

const AreaCodeSelect = styled(Select)`
  width: 100%;
  select {
    padding: 14px !important;
  }
`;

class ForgotPasswordPrev extends Component {
  state = {
    email: "",
    code: "",
    countdownToken: 0,
    loading: false,
    password: "",
    password2: "",
    securityKey: "",
    phone: "",
    areaCode: config.features.PhonePrefix,
  };
  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;

    if (config.features.SMSVerification) {
      if (this.state.phone.length < 8 || this.state.phone.length > 10) {
        this.props.alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }
      AccountService.VerifyForgotPassword(
        "",
        this.state.areaCode,
        this.state.phone
      ).then((response) => {
        this.getCodeResponse(response);
      });
    } else {
      if (this.state.email.length > 0) {
        AccountService.VerifyForgotPassword(this.state.email).then(
          (response) => {
            this.getCodeResponse(response);
          }
        );
      } else {
        this.props.alert("", i18n.t("common.msgEnterEmail"));
      }
    }
  };

  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handlePassword2Change = (e) => {
    this.setState({ ...this.state, password2: e.target.value });
  };
  getCodeResponse = (response) => {
    if (response.IsSuccess) {
      this.props.alert("", i18n.t("common.msgTokenSent"));

      this.setState({
        ...this.state,
        securityKey: response.data,
        loading: true,
      });
    } else {
      this.props.alert("", response.info);
    }
  };
  handleNextClick = () => {
    if (this.state.password !== this.state.password2) {
      this.props.alert("", i18n.t("forgotPassword.invalidConfirmPass"));
    } else {
      AccountService.ResetPassword(
        this.state.securityKey,
        this.state.code,
        this.state.password
      ).then((response) => {
        if (response.IsSuccess) {
          this.props.alert("", i18n.t("forgotPassword.updateSuccess"));
          this.props.appHistory.replace("/login");
        } else {
          this.props.alert("", response.info);
        }
      });
    }
  };
  checkCountdown = () => {
    if (this.state.countdownToken > 0) {
      this.timer = setTimeout(() => {
        this.setState({
          ...this.state,
          countdownToken: this.state.countdownToken - 1,
        });
        this.checkCountdown();
      }, 1000);
    }
  };

  render() {
    return (
      <Wrapper>
        {config.features.SMSVerification ? (
          <>
            {/* 手機驗證 */}
            <PhoneContainer>
              <GrayInputWrapper style={{ width: "20%"}}>
                <AreaCodeSelect
                  style={{ width: "100%"}}
                  native
                  value={this.state.areaCode}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      areaCode: e.target.value,
                    });
                  }}
                  disabled={this.state.currentStep === 1}
                >
                  <option value={config.features.PhonePrefix}>
                    {config.features.PhonePrefix}
                  </option>
                </AreaCodeSelect>
              </GrayInputWrapper>

              <GrayInputWrapper style={{ width: "80%" }}>
                <TextField
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                  fullWidth
                  placeholder={i18n.t("common.msgEnterPhone")}
                  type={"text"}
                />
              </GrayInputWrapper>
            </PhoneContainer>
            {/* 發送驗證碼 */}
            <GrayInputWrapper style={{ marginBottom: "20px" }}>
              <TextFieldWithButton
                buttonlabel={i18n.t("common.msgSendToken")}
                value={this.state.code}
                onChange={this.handleCodeChange}
                placeholder={i18n.t("common.msgEnterCode")}
                // label={i18n.t("common.token")}
                onClick={this.handleGetCodeClick}
                type={"text"}
              />
            </GrayInputWrapper>
          </>
        ) : (
          <>
            {/* email驗證 */}
            <GrayInputWrapper style={{ marginBottom: "20px" }}>
              <TextField
                value={this.state.email}
                onChange={this.handleEmailChange}
                // label={i18n.t("common.msgEnterEmail")}
                fullWidth
                type={"text"}
                placeholder={i18n.t("common.emailAddress")}
              />
            </GrayInputWrapper>

            <GrayInputWrapper style={{ marginBottom: "20px" }}>
              <TextFieldWithButton
                buttonlabel={i18n.t("common.msgSendToken")}
                style={{ margin: "20px auto 20px auto" }}
                value={this.state.code}
                onChange={this.handleCodeChange}
                // label={i18n.t("common.msgEnterCodeEmail")}
                placeholder={i18n.t("common.token")}
                onClick={this.handleGetCodeClick}
                type={"text"}
              />
            </GrayInputWrapper>
          </>
        )}

        <GrayInputWrapper style={{ marginBottom: "20px" }}>
          <TextField
            onChange={this.handlePasswordChange}
            // label={i18n.t("wap.register.password")}
            type={"password"}
            placeholder={i18n.t("common.NewPass")}
            fullWidth
            inputProps={{
              autoComplete: "new-password",
            }}
          />
        </GrayInputWrapper>

        <GrayInputWrapper style={{ marginBottom: "20px" }}>
          <TextField
            value={this.state.password2}
            onChange={this.handlePassword2Change}
            // label={i18n.t("common.msgEnterConfirmPass")}
            type={"password"}
            fullWidth
            placeholder={i18n.t("common.ConfirmPass")}
            autoComplete="no"
          />
        </GrayInputWrapper>

        <Button
          fullWidth
          disabled={
            (config.features.SMSVerification
              ? this.state.phone.length < 1
              : this.state.email.length < 1) ||
            this.state.code.length < 6 ||
            this.state.password.length < 6 ||
            this.state.password2.length < 6
          }
          onClick={this.handleNextClick}
        >
          {i18n.t("common.confirm")}
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    token: state.account.token,
  };
};
export default connect(mapStateToProps, null)(withRouter(ForgotPasswordPrev));
