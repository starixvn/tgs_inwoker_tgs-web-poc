import React, { Component } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { UPDATE_INFO } from "@/api-services/constant/actionType";
import { Button } from "@/components/UI/Button";
import BottomNote from "@/components/UI/BottomNote";
import Loading from "@/components/UI/Loading";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

class BaseProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, disableButton: false };
    this.isTextChanged = false;
  }

  /*
   * Please Override below functions
   * handleSubmitClicked,
   * isDisableButton
   */

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  updateInfo(payload) {
    this.props.dispatch({
      type: UPDATE_INFO,
      payload: payload,
    });
    this.handleBackClick();
  }
  duplicateText(count) {
    let value = "";
    for (let i = 0; i < count; i++) {
      value += "*";
    }
    return value;
  }
  maskString(value, start, end) {
    let newValue = value;
    if (end > start) {
      if (value.length > end) {
        newValue =
          value.substring(0, start) +
          this.duplicateText(end - start) +
          value.substring(end, value.length);
      }
    }
    return newValue;
  }
  checkButtonState = () => {
    if (this.isTextChanged) return false; //always disable if text not changed
    return this.isDisableButton();
  };

  onTextChanged = () => {
    this.isTextChanged = true;
    if (this.state.message != null && this.state.message.length > 0) {
      this.setState({ message: "" }); //clear
    }
  };

  showErrorMessage(message) {
    this.setState({ message: message });
  }
  showLoading(loading) {
    this.setState({ ...this.state, loading: loading });
  }
  setupContent(
    title,
    body,
    buttonTitle = i18n.t("common.submit"),
    bottomNode,
    noBack
  ) {
    return (
      <Container>
        {body}
        {this.state.message}
        <Button
          fullWidth
          disabled={this.checkButtonState() || this.state.disableButton}
          onClick={this.handleSubmitClicked}
          style={{ marginBottom: "20px" }}
        >
          {buttonTitle}
        </Button>
        {bottomNode || <BottomNote />}
        <Loading show={this.state.loading} />
      </Container>
    );
  }
}
export default BaseProfile;
