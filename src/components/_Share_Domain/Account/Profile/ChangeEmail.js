import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Step from "@/components/Mobile/components/_PrevShare/Step";
import BaseProfile from "./BaseProfile";
import { accountAction } from "@/api-services/actions/accountAction";
import { AccountService } from "@/api-services/services/AccountService";
import i18n from "@/utils/i18n";
import {
  FormControl,
  LabelContainer,
  ItemContainer,
} from "@/components/Mobile/styles/forms";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import TextFieldWithButton from "@/components/Mobile/components/UI/TextFieldWithButton";

class ChangeEmail extends BaseProfile {
  componentDidMount() {
    this.setState({
      ...this.state,
      email: this.props.account.info.member_email,
      code: "",
      currentStep: 1,
      countdownToken: 0,
      securityKey: "",
    });
  }

  handleChangeEmail = (e) => {
    this.setState({ ...this.state, email: e.target.value });
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
        btnTokenLabel: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
        btnTokenLabel: i18n.t("common.btnTokenLabel"),
      });
    }
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.email)
      return this.showErrorMessage(i18n.t("common.msgEnterEmail"));
    this.showLoading(true);
    AccountService.VerifyEmail(this.state.email)
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
          this.showErrorMessage(response.info);
          // if (response.code === 402) {
          //   this.showErrorMessage(i18n.t('common.msgInvalidEmail'))
          // } else {
          //   this.showErrorMessage(response.info)
          // }
        }

        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err.Message);
      });
  };

  isDisableButton = () => {
    const code = this.state.code;
    const email = this.state.email;
    return !(code && email);
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
    if (this.state.code.length < 6) {
      this.showErrorMessage(i18n.t("common.msgEnterCode"));
      return;
    }
    this.showLoading(true);
    if (this.state.currentStep === 1) {
      AccountService.UpdateEmail(this.state.securityKey, this.state.code)
        .then((response) => {
          if (response.IsSuccess) {
            this.setState({
              ...this.state,
              email: "",
              code: "",
              securityKey: "",
              currentStep: 2,
              countdownToken: 0,
            });
          } else {
            // if (response.code === 405) {
            //   this.showErrorMessage(
            //     i18n.t('common.msgInvalidPhoneCode')
            //   )
            // } else {
            //   this.showErrorMessage(response.info)
            // }
            this.showErrorMessage(response.info);
          }

          this.showLoading(false);
        })
        .catch((err) => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    } else {
      AccountService.UpdateEmail(this.state.securityKey, this.state.code)
        .then((response) => {
          if (response.IsSuccess) {
            this.props.getAccountProfile(true).then((responseUpdate) => {
              if (responseUpdate.IsSuccess) {
                this.props.appHistory.replace("/profile/email");
              }
              this.showLoading(false);
            });
          } else {
            // if (response.code === 405) {
            //   this.showErrorMessage(
            //     i18n.t('common.msgInvalidPhoneCode')
            //   )
            // } else {
            //   this.showErrorMessage(response.info)
            // }
            this.showErrorMessage(response.info);
            this.showLoading(false);
          }
        })
        .catch((err) => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    }
  };
  render() {
    return this.setupContent(
      i18n.t("profile.email.editEmail"),
      <>
        <Step
          steps={[
            { label: i18n.t("profile.email.verifyEmail") },
            { label: i18n.t("profile.email.addEmail") },
          ]}
          currentStep={this.state.currentStep}
        />

        <ItemContainer>
          <LabelContainer>{i18n.t("common.emailAddress")}</LabelContainer>
          <FormControl variant="outlined">
            <TextField
              value={this.state.email}
              onChange={this.handleChangeEmail}
              placeholder={i18n.t("profile.email.plsEnterEmail")}
              disabled={this.state.currentStep === 1}
            />
          </FormControl>
        </ItemContainer>

        <ItemContainer>
          <LabelContainer>{i18n.t("common.token")}</LabelContainer>
          <FormControl variant="outlined">
            <TextFieldWithButton
              buttonlabel={
                this.state.countdownToken <= 0
                  ? i18n.t("common.msgSendToken")
                  : i18n.t("common.btnTokenResendLabel") +
                    "(" +
                    this.state.countdownToken +
                    "s)"
              }
              type={"text"}
              value={this.state.code}
              onChange={this.handleChangeCode}
              placeholder={i18n.t("common.msgEnterEmailCode")}
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
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChangeEmail));
