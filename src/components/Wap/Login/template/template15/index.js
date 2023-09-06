import React from "react";
import styled from "styled-components";
import Textbox from "../../Textbox";
import Select from "../../Select";
import VerificationCode from "../../VerificationCode";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import ButtonWap from "../../../../Share/ButtonWap";

import i18n from "../../../../../utils/i18n";
import config from "../../../../../config/config";

const Logo = styled.div`
  width: 300px;
  height: 200px;
  margin: 60px auto 0px auto;
  background: url("${(props) => props.img}") no-repeat center center;
  background-size: contain;
`;

const FormContainer = styled.div`
  margin: 0 30px;
  background: rgb(0, 0, 0, 0.44);
  border-radius: 40px;
  display: flex;
  min-height:680px;
  justify-content: space-between;
`;

const FormWrapper = styled.div`
  width: 580px;
  padding: 40px 0;
  margin-left:${({selected}) => selected == 0 ? "10px" : 0};
`;
const FormTitle= styled.div`
  font-size:36px;
  color:#fff;
  text-align:center;
  font-weight:bold; 
`;
const FormSwitch = styled.div`
  width: 90px;
  background: rgb(0, 0, 0, 0.44);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: ${({lang}) => ['zh-CN','zh-TW'].indexOf(lang) >=0 ? '20' : '10'}px;

`;
const FormSwitchTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;


  writing-mode: vertical-rl;
  text-transform: uppercase;

  &:before{
    content:"";
    width:30px
    height:30px
    background-color: #fff;
    mask: ${({ icon }) => {
      return `url(${
        process.env.PUBLIC_URL + `/assets/images/wapp/home/t15/icon-member.svg`
      }) no-repeat center /
      contain;`;
    }};
    margin-bottom:20px;
  }

`;
const ClearBoth= styled.div`
clear:both;
`;
const RememberPassContainer = styled.div`
  float: left;
  margin: 10px 0 0 25px;
`;
const RememberPassLabel = styled.div`
  float: left;
  font-size: 28px;
  margin-top: 14px;
  color: ${({ theme }) => theme.loginText};
`;
const CustomCheck = withStyles({
  root: {
    width: "50px",
    height: "50px",
    fontSize: "50px",
    float: "left",
  },
})(Checkbox);
const ForgotPassContainer = styled.div`
  float: righht;
  margin: 10px 25px 0 0;
`;
const ForgotPassLabel = styled(RememberPassLabel)`
  float: right;
`;
const LoginActionContainer = styled.div`
  margin: 100px 0 0 0;
`;

const LanguageWrap = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.loginText};
  font-size: 28px;
  margin-top: 20px;
`;

const DownloadButtonHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadButton = styled(LanguageWrap)`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`;
const LanguageLink = styled.span`
  text-align: center;
  color: ${(props) =>
    props.selected === true ? props.theme.accent : props.theme.loginText};
`;

const TNC = styled(RememberPassLabel)`
  width: 515px;
  margin-bottom: 14px;
  font-size: 20px;
`;

const CustomWapButton = styled(ButtonWap)`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-login-T15.png`})
    no-repeat center;
  border: none;
  color: #fff;
  background-size: contain;
  padding-top: 18px;
  font-size: 30px;
  font-weight: bold;
  width: 550px;
  height: 80px;
  font-size: 30px;
`;

const NoStyleButton = styled(ButtonWap)`
  background: none;
  border: none;
  color: #fff;
  padding-top: 16px;
  font-size: 24px;
  width: 550px;
  height: 64px;
`;

const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 85px;
  font-size: 25px;
  bottom: 35px;
  border: none;
  outline: none;
  background: none;
  color: #fff;
  & option {
    color: #000;
  }
`;

const CustomWrapper = styled.div`
  position: relative;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const CheckBoxUnchecked = styled.div`
  width: 40px;
  height: 40px;

  background: ${() => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/icon-unchecked-T11.png`
    }) no-repeat center /
    contain;`;
  }};
`;

const CheckBoxChecked = styled.div`
  width: 40px;
  height: 40px;

  background: ${() => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/icon-checked-T11.png`
    }) no-repeat center /
    contain;`;
  }};
`;

const Description = styled.div`
  float: left;
  padding-right: 30px;
  padding-left: 30px;
  font-size: 30px;
  margin: 5px 0px 25px 30px;
  color: red;
`;

const SponsorContainer = styled.div``;

const SponsorHeader = styled.div`
  display:flex;
  flex-flow: row nowrap;

  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  margin-top: 60px;
`;
const SponsorHeaderLine = styled.span`
  background-color:#fff;
  width: 200px;
  height:2px;
`;
const SponsorHeaderText = styled.div`
  color:#fff;
  font-size:26px;
`;
const SponserItems = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding:30px 30px;
`;
const SponserItem = styled.div`
  width:120px;

  color:#fff;
`;
const SponserImg= styled.div`
  background:url(${process.env.PUBLIC_URL}/assets/images/wapp/home/T15/${({img}) => img}) center  no-repeat;
  background-size:contain;
  width:100px;
  height:100px;
  font-size:18px;

  text-align:center;
  width:100%;
`;
const SponserTitle= styled.div`
  font-size:22px;
  margin-top:10px;
  text-align:center;
  width:100%;
`;
const SponserDesc= styled.div`
  font-size:12px;
  text-align:center;
  width:100%;
`;
const Template15 = ({
  template,
  logoImg,
  handleChangeSelection,
  isUpdate,
  selected,
  username,
  password,
  hidePassword,
  rememberMe,
  hideConfirmPassword,
  confirmPassword,
  areaCode,
  phone,
  email,
  fromCustomDomain,
  promoteType,
  promoId,
  upper,
  prefill,
  tnc,
  code,
  countdown,
  handleToggleShow,
  handleUsernameChange,
  handlePasswordChange,
  handleRememberMeChange,
  handleForgotpasswordClick,
  handleLoginClick,
  handleBackToHomeClick,
  handleChangeLanguage,
  handleGoDownloadPage,
  handleToggleConfirmPasswordShow,
  handleConfirmPasswordChange,
  handleAreaCodeChange,
  handlePhoneChange,
  handleEmailChange,
  handlePromoCodeChange,
  handleUpperChange,
  handleSwitchType,
  handleTncClick,
  handleRegisterClick,
  handleCodeChange,
  handleGetCodeClick,
  handleActivationClick,
  brandLanguage,
  haveAffiliate,
}) => {
  const customInputContainerStyle = {
    background: `rgb(0 0 0 / 44%)`,
    backgroundSize: "435px 100px",
    border: "none",
    borderRadius: "20px",
    height: "100px",
    width: "550px",
  };
  const customIconStyle = {
    margin: "25px 15px 0 40px",
    width: "50px",
    height: "50px",
    mask: "none",
    WebkitMask: "none",
  };
  const customInputStyle = {
    color: "#fff",
    marginTop: "32px",
    placeHolderStyle: ` 
      font-size: 28px;
    `,
  };
  const customRightIconStyle = {
    marginTop: "34px",
  };
  const customVerificationInputContainerStyle = {
    background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/btn-input-T11.png) no-repeat`,
    backgroundSize: "395px 80px",
    border: "none",
    height: "80px",
  };
  const customVerificationInputStyle = {
    color: "#fff",
    marginLeft: "20px",
    placeHolderStyle: ` 
    font-size: 28px;
    `,
  };
  const customSelectInputContainerStyle = {
    background: `0% 0% / 435px 100px rgba(0, 0, 0, 0.44)`,
    backgroundSize: "445px 80px",
    border: "none",
    height: "80px",
  };
  const SponsorList = [
    {img:"sponsor-1.png",title:i18n.t("t15.sponsor1"), desc :i18n.t("t15.sponsorDesc")},
    {img:"sponsor-2.png",title:i18n.t("t15.sponsor2"), desc :i18n.t("t15.sponsorDesc")},
    {img:"sponsor-3.png",title:i18n.t("t15.sponsor3"), desc :i18n.t("t15.sponsorDesc")},
    {img:"sponsor-4.png",title:i18n.t("t15.sponsor4"), desc :i18n.t("t15.sponsorDesc")},
    {img:"sponsor-5.png",title:i18n.t("t15.sponsor5"), desc :i18n.t("t15.sponsorDesc")}

  ]
  return (
    <React.Fragment>
      <Logo img={logoImg}></Logo>
      {/* <ButtonSwitch
        handleChangeSelection={handleChangeSelection}
        isUpdate={isUpdate}
        selected={selected}
      ></ButtonSwitch> */}

      <FormContainer>
      {selected==1 || selected==2 ?  <FormSwitch lang={i18n.language} onClick={() => handleChangeSelection(0)}>
        <FormSwitchTitle >
        {i18n.t("t15.memberLogin")}
        </FormSwitchTitle>
      </FormSwitch> : null }
     
        <FormWrapper selected={selected}>
          {(() => {
            if (selected === 0) {
              return (
                <React.Fragment>
                  <FormTitle>{i18n.t("common.login")}</FormTitle>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-user-T11.png`
                    }
                    style={{ ...customInputContainerStyle, marginTop: "60px" }}
                    inputStyle={{ ...customInputStyle }}
                    iconStyle={{
                      ...customIconStyle,
                      background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-user-T11.png) no-repeat center / contain`,
                    }}
                    type={"text"}
                    placeholder={i18n.t("common.username")}
                    value={username}
                    maxLength="16"
                    onChange={handleUsernameChange}
                  ></Textbox>

                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-unlock-T11.png`
                    }
                    style={{ ...customInputContainerStyle, marginTop: "20px" }}
                    inputStyle={{ ...customInputStyle }}
                    iconStyle={{
                      ...customIconStyle,
                      background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-T11.png) no-repeat center / contain`,
                    }}
                    rightIconStyle={{ ...customRightIconStyle }}
                    type={hidePassword ? "password" : "text"}
                    hidePassword={hidePassword}
                    placeholder={i18n.t("common.password")}
                    password={true}
                    toggleShow={handleToggleShow}
                    value={password}
                    onChange={handlePasswordChange}
                  ></Textbox>
                  <RememberPassContainer>
                    <CustomCheck
                      style={{ fontSize: "30px" }}
                      icon={<CheckBoxUnchecked />}
                      checkedIcon={<CheckBoxChecked />}
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <RememberPassLabel>
                      {i18n.t("wap.login.rememberMe")}
                    </RememberPassLabel>
                  </RememberPassContainer>
                  <ForgotPassContainer onClick={handleForgotpasswordClick}>
                    <ForgotPassLabel>
                      {i18n.t("wap.login.forgetPass")}
                    </ForgotPassLabel>
                  </ForgotPassContainer>

                  <LoginActionContainer>
                    <CustomWapButton
                      name={i18n.t("common.login")}
                      onClick={handleLoginClick}
                    ></CustomWapButton>
                    <NoStyleButton
                      name={i18n.t("wap.login.browse")}
                      style={{ "margin-top": "10px" }}
                      onClick={handleBackToHomeClick}
                    ></NoStyleButton>
                  </LoginActionContainer>
                  <LanguageWrap>
                    {(() => {
                      return brandLanguage.map((lang, index) => {
                        return (
                          <React.Fragment>
                            <LanguageLink
                              selected={i18n.language === lang.culturecode}
                              onClick={() => handleChangeLanguage(lang)}
                            >
                              {i18n.t("lang." + lang.culturecode)}
                            </LanguageLink>

                            {brandLanguage.length - 1 !== index ? (
                              <LanguageLink> | </LanguageLink>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        );
                      });
                    })()}
                  </LanguageWrap>
                  {config.features.HaveDownloadFeature && (
                    <DownloadButtonHolder>
                      <DownloadButton onClick={handleGoDownloadPage}>
                        <Icon icon="icon-download" />
                        {i18n.t("wap.main.account.appDownload")}
                      </DownloadButton>
                    </DownloadButtonHolder>
                  )}
                </React.Fragment>
              );
            } else if (selected === 1) {
              return (
                <React.Fragment>
                  <FormTitle>{i18n.t("common.register")}</FormTitle>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-user-T11.png`
                    }
                    style={{ ...customInputContainerStyle, marginTop: "60px" }}
                    inputStyle={{ ...customInputStyle }}
                    iconStyle={{
                      ...customIconStyle,
                      background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-user-T11.png) no-repeat center / contain`,
                    }}
                    rightIconStyle={{ ...customRightIconStyle }}
                    type={"text"}
                    placeholder={i18n.t("wap.register.username")}
                    maxLength="16"
                    value={username}
                    onChange={handleUsernameChange}
                  ></Textbox>

                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-unlock-T11.png`
                    }
                    style={{ ...customInputContainerStyle, marginTop: "20px" }}
                    inputStyle={{ ...customInputStyle }}
                    iconStyle={{
                      ...customIconStyle,
                      background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-T11.png) no-repeat center / contain`,
                    }}
                    rightIconStyle={{ ...customRightIconStyle }}
                    type={hidePassword ? "password" : "text"}
                    hidePassword={hidePassword}
                    placeholder={i18n.t("wap.register.password")}
                    password={true}
                    maxLength="20"
                    toggleShow={handleToggleShow}
                    value={password}
                    onChange={handlePasswordChange}
                  ></Textbox>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-unlock-2-T11.png`
                    }
                    style={{ ...customInputContainerStyle, marginTop: "20px" }}
                    inputStyle={{ ...customInputStyle }}
                    iconStyle={{
                      ...customIconStyle,
                      background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-2-T11.png) no-repeat center / contain`,
                    }}
                    rightIconStyle={{ ...customRightIconStyle }}
                    type={hideConfirmPassword ? "password" : "text"}
                    hidePassword={hideConfirmPassword}
                    placeholder={i18n.t("wap.register.confirmPassword")}
                    password={true}
                    maxLength="20"
                    toggleShow={handleToggleConfirmPasswordShow}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  ></Textbox>

                  {config.features.Register_ShowPhone && (
                    <CustomWrapper>
                      <Select
                        type={"text"}
                        placeholder={i18n.t(
                          "forgotPassword.plsEnterPhoneNumber"
                        )}
                        selectValue={areaCode}
                        onSelectChange={handleAreaCodeChange}
                        value={phone}
                        maxLength={config.features.MAX_PHONE_LENGTH || 10}
                        onChange={handlePhoneChange}
                        inputStyle={{ ...customVerificationInputStyle }}
                        style={{ ...customSelectInputContainerStyle }}
                        customSelBg={"0% 0% / 435px 100px rgba(0, 0, 0, 0.44)"}
                        primaryBg={false}
                      ></Select>
                    </CustomWrapper>
                  )}

                  {config.features.Register_ShowEmail && (
                    <CustomWrapper>
                      <Textbox
                        icon={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/icon-email.png`
                        }
                        style={{
                          ...customInputContainerStyle,
                          marginTop: "20px",
                        }}
                        inputStyle={{ ...customInputStyle }}
                        iconStyle={{
                          ...customIconStyle,
                          background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-email.png) no-repeat center / contain`,
                        }}
                        rightIconStyle={{ ...customRightIconStyle }}
                        type={"text"}
                        placeholder={i18n.t("wap.register.email")}
                        maxLength="50"
                        value={email}
                        onChange={handleEmailChange}
                      ></Textbox>
                    </CustomWrapper>
                  )}

                  {!(
                    config.features.Register_HideInvitation && fromCustomDomain
                  ) && (
                    <CustomWrapper>
                      <Textbox
                        icon={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/icon-promo.png`
                        }
                        style={{
                          ...customInputContainerStyle,
                          marginTop: "20px",
                        }}
                        inputStyle={{ ...customInputStyle }}
                        iconStyle={{
                          ...customIconStyle,
                          width: "0px",
                        }}
                        rightIconStyle={{ ...customRightIconStyle }}
                        type={"text"}
                        placeholder={i18n.t("wap.register.promoteCode")}
                        value={promoteType === "a" ? promoId : upper}
                        onChange={
                          promoteType === "a"
                            ? handlePromoCodeChange
                            : handleUpperChange
                        }
                        disabled={prefill}
                      ></Textbox>
                      {haveAffiliate && (
                        <CustomInvitationSelect
                          disabled={prefill}
                          value={promoteType}
                          selected={promoteType}
                          onChange={handleSwitchType}
                        >
                          <option value="a">{i18n.t("usertype.agent")}</option>
                          <option value="p">{i18n.t("usertype.player")}</option>
                        </CustomInvitationSelect>
                      )}
                    </CustomWrapper>
                  )}

                  <RememberPassContainer>
                    <CustomCheck
                      style={{ fontSize: "30px" }}
                      icon={<CheckBoxUnchecked />}
                      checkedIcon={<CheckBoxChecked />}
                      checked={tnc}
                      onChange={handleTncClick}
                    />
                    <TNC>{i18n.t("web.register.contract")}</TNC>
                  </RememberPassContainer>

                  <CustomWapButton
                    style={{ margin: "150px auto 0px auto" }}
                    name={
                      config.features.Register_CustomFlow_IDR
                        ? i18n.t("common.nextStep")
                        : i18n.t("common.register")
                    }
                    onClick={handleRegisterClick}
                    disableButton={!tnc}
                  ></CustomWapButton>
                </React.Fragment>
              );
            } else if (selected === 2) {
              return (
                <React.Fragment>
                  <FormTitle style={{marginBottom:"80px"}}>{i18n.t("profile.phoneVerification")}</FormTitle>
                  <Select
                    type={"text"}
                    placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
                    selectValue={areaCode}
                    onSelectChange={handleAreaCodeChange}
                    value={phone}
                    onChange={handlePhoneChange}
                    leaveGap={config.features.SkipSMSVerification}
                    inputStyle={{ ...customVerificationInputStyle }}
                    style={{ ...customSelectInputContainerStyle,margin:"20px 40px 0px 0" ,width:"360px" }}
                    primaryBg={true}
                    customSelBg={"0% 0% / 360px 100px rgba(0, 0, 0, 0.44)"}
                    containerStyle={{border : "none",padding:"1px" , width:"140px", margin:"20px 0px 0px 20px"}}
                  ></Select>
                  {!config.features.SkipSMSVerification && (
                    <>
                      <VerificationCode
                        value={code}
                        onChange={handleCodeChange}
                        countdown={countdown}
                        placeholder={i18n.t("common.msgEnterCode")}
                        handleGetCodeClick={handleGetCodeClick}
                        inputStyle={{ ...customVerificationInputStyle , width:"310px" }}
                        style={{ ...customSelectInputContainerStyle, width:"310px" ,margin:"20px 0px 0px 20px"}}
                        btnStyle={{width:"190px", margin:"20px 40px 0 0",fontSize:"28px" }}
              
                      ></VerificationCode>
                      {config.features.Custom_Temp_show_verify_SMS_hints && (
                        <Description>
                          {i18n.t("web.register.errorCustomDesc")}
                        </Description>
                      )}
                    </>
                  )}
                  <ClearBoth></ClearBoth>
                  <CustomWapButton
                    style={{ margin: "100px auto 0 auto" }}
                    name={i18n.t("common.submit")}
                    onClick={handleActivationClick}
                  ></CustomWapButton>
                </React.Fragment>
              );
            }
          })()}
        </FormWrapper>
        {selected==0 ?  <FormSwitch lang={i18n.language} onClick={() => handleChangeSelection(1)}>

        <FormSwitchTitle >
        {i18n.t("t15.memberRegister")}
        </FormSwitchTitle>
        </FormSwitch> : null }
      </FormContainer>

      <SponsorContainer>
        <SponsorHeader>
          <SponsorHeaderLine></SponsorHeaderLine>
          <SponsorHeaderText>{i18n.t("t15.sponsor")}</SponsorHeaderText>
          <SponsorHeaderLine></SponsorHeaderLine>
        </SponsorHeader>
        <SponserItems>
          {SponsorList.map((item, index)=> {
            return <SponserItem key={index}>
                  <SponserImg img={item.img}></SponserImg>
                  <SponserTitle>{item.title}</SponserTitle>
                  <SponserDesc>{item.desc}</SponserDesc>
              </SponserItem>

          })}
         
   
        </SponserItems>
      </SponsorContainer>
    </React.Fragment>
  );
};

export default Template15;
