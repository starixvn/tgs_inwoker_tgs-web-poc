import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Step from "@/components/Mobile/components/_PrevShare/Step";
import BaseProfile from "./BaseProfile";
import { accountAction } from "@/api-services/actions/accountAction";
import { AccountService } from "@/api-services/services/AccountService";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import config from "@/config/config";
import TextFieldWithButton from "@/components/Mobile/components/UI/TextFieldWithButton";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import {
  FormControl,
  LabelContainer,
  ItemContainer,
} from "@/components/Mobile/styles/forms";
import { Select } from "@/components/Mobile/components/UI/Select";

const PhoneContainer = styled.div`
  display: flex;
  gap: 8px;
`;

class ChangePhone extends BaseProfile {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      phone: this.props.account.info.member_phone || "",
      areacode: config.features.PhonePrefix,
      code: "",
      currentStep: 1,
      countdownToken: 0,
      securityKey: "",
    };
  }

  handleChangePhone = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
    this.onTextChanged();
  };
  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );

    if (!expr.test(this.state.phone)) {
      return this.showErrorMessage(
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
      );
    }
    this.showLoading(true);
    AccountService.VerifyPhone(this.state.phone, this.state.areacode)
      .then((response) => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          this.setState({
            ...this.state,
            countdownToken: 60,
            securityKey: response.data,
          });
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.showInfoMessage(response.info);
        }

        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err.Message);
      });
  };
  handleVerifyTokenError = (err) => {
    this.showErrorMessage(err.Message);

    if (
      err.Result.RemainingSec != null &&
      isNaN(err.Result.RemainingSec) === false
    ) {
      this.setState({
        ...this.state,
        countdownToken: err.Result.RemainingSec,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    }

    this.showLoading(false);
  };
  isDisableButton = () => {
    const code = this.state.code;
    const phone = this.state.phone;
    return !(code && phone);
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "error"
    // });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "info"
    // });
  };
  handleSubmitClicked = () => {
    this.showLoading(true);
    AccountService.UpdatePhone(this.state.securityKey, this.state.code)
      .then((response) => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t("common.msgTokenVerified"));
          this.showLoading(false);
          if (this.state.currentStep === 1) {
            this.setState({
              ...this.state,
              phone: "",
              code: "",
              securityKey: "",
              currentStep: 2,
              countdownToken: 0,
            });
          } else {
            this.props.getAccountInfo().then((responseUpdate) => {
              if (responseUpdate.IsSuccess) {
                this.props.appHistory.replace("/profile/phone");
              }
            });
          }
        } else {
          this.showErrorMessage(response.info);
          // if (response.code === 405) {
          //   this.showErrorMessage(
          //     i18n.t('common.msgInvalidPhoneCode')
          //   )
          // } else {
          //   this.showErrorMessage(response.info)
          // }
        }
        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err);
        this.showLoading(false);
      });
  };
  render() {
    return this.setupContent(
      i18n.t("profile.changePhone.title"),
      <>
        <Step
          steps={[
            { label: i18n.t("profile.changePhone.step1Title") },
            { label: i18n.t("profile.changePhone.step2Title") },
          ]}
          currentStep={this.state.currentStep}
        />

        <ItemContainer>
          <LabelContainer>{i18n.t("common.phoneNumber")}</LabelContainer>

          <PhoneContainer>
            <FormControl variant="outlined" style={{ width: "30%" }}>
              <Select
                native
                value={this.state.areacode}
                onChange={(e) => {
                  this.setState({ ...this.state, areacode: e.target.value });
                }}
                disabled={this.state.currentStep === 1}
              >
                <option value={config.features.PhonePrefix}>
                  {config.features.PhonePrefix}
                </option>
              </Select>
            </FormControl>

            <FormControl variant="outlined">
              <TextField
                type={"text"}
                value={this.state.phone}
                placeholder={i18n.t("common.msgEnterPhone")}
                disabled={this.state.currentStep === 1}
                onChange={this.handleChangePhone}
                maxLength={config.features.MAX_PHONE_LENGTH || 10}
              />
            </FormControl>
          </PhoneContainer>
        </ItemContainer>

        <ItemContainer>
          <FormControl>
            <TextFieldWithButton
              buttonlabel={
                this.state.countdownToken <= 0
                  ? i18n.t("common.msgSendToken")
                  : i18n.t("common.btnTokenResendLabel") +
                    "(" +
                    this.state.countdownToken +
                    "s)"
              }
              value={this.state.code}
              onChange={this.handleChangeCode}
              placeholder={i18n.t("common.msgEnterPhoneCode")}
              label={i18n.t("common.token")}
              onClick={this.handleGetCodeClick}
              maxLength={6}
            />
          </FormControl>
        </ItemContainer>
      </>,
      this.state.currentStep === 1
        ? i18n.t("common.nextStep")
        : i18n.t("common.submit")
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChangePhone));
