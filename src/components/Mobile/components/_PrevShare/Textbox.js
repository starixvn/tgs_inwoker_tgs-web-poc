import React, { Component } from "react";
import styled from "styled-components";
import config from "../../../../config/config";
const CustomText = styled.div``;

const CustomLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: ${({ theme }) => theme.secondary};
  font-size: 1rem;
  border: 0;
  width: 100%;
  padding: 15px 29px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 1rem;
    font-weight: 400;
  }
  background: none;
  &:disabled {
    //background: #fff;
    opacity: 1;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
class Textbox extends Component {
  render() {
    return (
      <CustomText style={{ ...this.props.style }} onClick={this.props.onClick}>
        <LabelContainer>
          <CustomLabel isCustomProfileStyle={this.props.isCustomProfileStyle}>
            {this.props.label}
          </CustomLabel>
          {this.props.custom && <div>{this.props.custom}</div>}
        </LabelContainer>

        <CustomInput
          style={this.props.color ? { color: this.props.color } : {}}
          type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          maxLength={this.props.maxLength ? this.props.maxLength : 50}
          isCustomProfileStyle={this.props.isCustomProfileStyle}
        ></CustomInput>
      </CustomText>
    );
  }
}

export default Textbox;
