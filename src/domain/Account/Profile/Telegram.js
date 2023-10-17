import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import BaseProfile from "./BaseProfile";
import i18n from "@/utils/i18n";
import { accountAction } from "@/api-services/actions/accountAction";
import { AccountService } from "@/api-services/services/AccountService";
import config from "@/config/config";
import BottomNote from "@/components/UI/BottomNote";
import { TextField } from "@/components/UI/TextField";
import { FormControl, LabelContainer, ItemContainer } from "@/styles/forms";

class Telegram extends BaseProfile {
  state = {
    telegram: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_telegram) isConfigured = true;
    this.setState({
      telegram: isConfigured ? this.props.account.info.member_telegram : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ telegram: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.telegram;
  };
  handleSubmitClicked = () => {
    const telegram = this.state.telegram;
    //validate here
    //sdasdasdasda
    // const re = new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");
    // if (!telegram.match(re)) {
    //   this.props.alert(
    //     '',
    //     i18n.t('profile.telegram.msgInvalidTelegram')
    //   )
    //   // this.props.enqueueSnackbar("微信号码格式不正确", {
    //   //   key: "error"
    //   // });
    //   return
    // }

    this.showLoading(true);
    //api
    AccountService.UpdateIM(telegram, "telegram", "telegram")
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                telegram: telegram,
                isConfigured: true,
              });
            }
            this.showLoading(false);
            this.props.alert("", i18n.t("common.msgSuccessUpdateProfile"));
          });
        } else {
          this.props.alert("", response.msg);
          this.showLoading(false);
          // this.props.enqueueSnackbar(response.msg, {
          //   key: "error"
          // });
        }
      })
      .catch((err) => {
        this.props.alert("", err);
        // this.props.enqueueSnackbar(err, {
        //   key: "error"
        // });
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("common.telegram"),
      <>
        <ItemContainer>
          <LabelContainer>{i18n.t("common.telegram")}</LabelContainer>
          <FormControl variant="outlined">
            <TextField
              value={this.state.telegram}
              onChange={this.handleChangeNumber}
              placeholder={i18n.t("profile.telegram.plsEnterTelegram")}
              disabled={
                this.state.isConfigured &&
                (config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly)
              }
              maxLength={15}
            />
          </FormControl>
        </ItemContainer>
      </>,
      this.state.isConfigured && config.features.ChangesNotAllowed
        ? i18n.t("common.configured")
        : this.state.telegram !== this.props.account.member_telegram &&
            i18n.t("common.complete"),
      (() => {
        if (
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.telegram.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.telegram.here"
              )}
            />
          );
        }
      })()
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Telegram));
