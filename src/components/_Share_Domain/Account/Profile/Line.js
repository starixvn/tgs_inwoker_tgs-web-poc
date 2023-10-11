import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BaseProfile from "./BaseProfile";
import i18n from "@/utils/i18n";
import { accountAction } from "@/api-services/actions/accountAction";
import { AccountService } from "@/api-services/services/AccountService";
import config from "@/config/config";
import BottomNote from "@/components/Mobile/components/UI/BottomNote";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import {
  FormControl,
  LabelContainer,
  ItemContainer,
} from "@/components/Mobile/styles/forms";

class Line extends BaseProfile {
  state = {
    line: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_line) isConfigured = true;
    this.setState({
      line: isConfigured ? this.props.account.info.member_line : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ line: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.line;
  };
  handleSubmitClicked = () => {
    const line = this.state.line;
    //validate here
    //sdasdasdasda
    // const re = new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");
    // if (!line.match(re)) {
    //   this.props.alert(
    //     '',
    //     i18n.t('profile.line.msgInvalidLine')
    //   )
    //   // this.props.enqueueSnackbar("微信号码格式不正确", {
    //   //   key: "error"
    //   // });
    //   return
    // }

    this.showLoading(true);
    //api
    AccountService.UpdateIM(line, "line", "line")
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                line: line,
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
      i18n.t("common.line"),
      <>
        <ItemContainer>
          <LabelContainer>{i18n.t("common.line")}</LabelContainer>
          <FormControl variant="outlined">
            <TextField
              value={this.state.line}
              onChange={this.handleChangeNumber}
              placeholder={i18n.t("profile.line.plsEnterLine")}
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
        : this.state.line !== this.props.account.member_line &&
            i18n.t("common.complete"),
      (() => {
        if (
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.line.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.line.here"
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Line));
