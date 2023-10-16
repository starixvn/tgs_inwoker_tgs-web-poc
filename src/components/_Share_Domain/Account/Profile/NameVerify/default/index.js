import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import i18n from "@/utils/i18n";
import BaseProfile from "../../BaseProfile";
import { accountAction } from "@/api-services/actions/accountAction";
import { RESET_ACCOUNTRESULT } from "@/api-services/constant/actionType";
import config from "@/config/config";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import {
  FormControl,
  LabelContainer,
  ItemContainer,
} from "@/components/Mobile/styles/forms";
import { Button } from "@mui/material";

class Default extends BaseProfile {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: this.props.icUpload,
    };
  }

  render() {
    return (
      <>
        <ItemContainer>
          <LabelContainer>
            {config.features.Profile_CustomIdentityPageTranslation
              ? i18n.t("piso.profile.fullName")
              : i18n.t("profile.nameVerify.verifyName")}
          </LabelContainer>
          <FormControl variant="outlined">
            <TextField
              fullWidth
              value={this.props.name}
              onChange={this.props.handleChangeName}
              type={"text"}
              placeholder={
                config.features.Profile_CustomIdentityPageTranslation
                  ? i18n.t("piso.profile.enterFullName")
                  : i18n.t("profile.nameVerify.title")
              }
              disabled={false}
              maxLength={256}
            />
          </FormControl>
        </ItemContainer>

        {config.features.ICVerification && (
          <ItemContainer>
            <LabelContainer>
              {config.features.Profile_CustomIdentityPageTranslation
                ? i18n.t("piso.profile.documentNumber")
                : i18n.t("profile.nameVerify.icNum")}
            </LabelContainer>
            <FormControl variant="outlined">
              <TextField
                fullWidth
                value={this.props.ic}
                onChange={this.props.handleChangeIC}
                placeholder={
                  config.features.Profile_CustomIdentityPageTranslation
                    ? i18n.t("piso.profile.enterDocumentNumber")
                    : i18n.t("profile.nameVerify.msgEnterICNum")
                }
                disabled={false}
                maxLength={256}
              />
            </FormControl>
          </ItemContainer>
        )}

        {config.features.ICVerificationUpload && (
          <ItemContainer>
            <LabelContainer>{i18n.t("common.upload")}</LabelContainer>

            <Button
              variant={"outlined"}
              style={{
                height: "58px",
                borderRadius: "5px",
                color: "white",
                borderColor: "white",
              }}
              onClick={() => {
                document.getElementById("getFile").click();
              }}
            >
              {i18n.t("common.upload")}
            </Button>

            <input
              type="file"
              id="getFile"
              onChange={this.props.handleFileChange}
              accept="image/jpg, image/jpeg, image/png, image/tiff"
              style={{ display: "none" }}
            />
            {this.props.icUpload ? this.props.icUpload[0].name : ""}
          </ItemContainer>
        )}
      </>
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    updateMemberCardNo: (name, number) =>
      dispatch(accountAction.updateMemberCardNo(name, number)),
    resetResult: () =>
      dispatch({
        type: RESET_ACCOUNTRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Default));
