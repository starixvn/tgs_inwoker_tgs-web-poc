import React, { Component } from "react";

import styled from "styled-components";
import i18n from "../../utils/i18n";
import LoginContainer from "./Login/LoginContainer"
import LoginForm from "./Login/LoginForm"

const TitleContainer = styled.div`
  text-align: center;

  font-size: 42px;

  color: ${({ theme }) => theme.secondary};
`;

const SubTitleContainer = styled.div`
  text-align: center;

  font-size: 18px;

  color: ${({ theme }) => theme.secondary};
`;

const LinkStyle = styled.a`
  margin-top: 5px;
  text-decoration: underline;

  font-size: 15px;

  color: ${({ theme }) => theme.secondary};

  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  text-align: center;

  font-size: 14px;

  line-height: 1.43;

  color: ${({ theme }) => theme.secondary};
`;

const OnlineSupportLink = styled(LinkStyle)`
  font-size: 13px;
`;

class Login extends Component {
  render() {
    return (
      <LoginContainer onhandleClose={this.props.onhandleClose}>
        <TitleContainer>{i18n.t("web.login.loginTitle")}</TitleContainer>
        <SubTitleContainer>
          {i18n.t("web.login.loginTitleLine2")}
        </SubTitleContainer>
        <LoginForm
          onhandleLoginClick={this.props.onhandleLoginClick}
          onhandleRegister={this.props.onhandleRegister}
          onhandleForgotPassword={this.props.onhandleForgotPassword}
        />
        <Description>
          {i18n.t("web.login.cs")}
          <OnlineSupportLink onClick={this.props.onhandleOnlineSupport}>
            {i18n.t("web.login.contactus")}
          </OnlineSupportLink>

          <br></br>
          {i18n.t("web.login.footerDesc")}
        </Description>
        </LoginContainer>
    );
  }
}

export default Login;
