import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";
import { Dialog } from "@material-ui/core";
import IMHandler from "../../Share/IMHandler";
import { AppHistory } from "../../../history/History";
import config from "../../../config/config";
import { utility } from "../../../utils/utility";
const commonpath = "panel";

const Icon = styled.div`
  height: 70px;
  width: 50px;

  background-color: ${({ theme, active }) => {
    return active ? "white" : theme.primary;
  }};
  transition: transform 0.5s;
  mask: url(${({ active, src, src2 }) => (active ? src2 : src)}) no-repeat
    center / contain;
  -webkit-mask: url(${({ active, src, src2 }) => (active ? src2 : src)})
    no-repeat center / contain;
  background-size: 100%;
  transform: translateY(${({ active }) => (active ? "-5px" : "3px")});
`;

const Text = styled.div`
  font-size: 8px;
  text-align: center;
  width: 50px;
  pointer-events: none;
  opacity: ${({ active }) => (active ? "1" : "0")};
  transition: opacity 200ms;
  transform: translateY(-15px);
`;

const RotateBack = styled.div`
  transform: rotate(-45deg);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  height: auto;
  position: fixed;
  right: 2%;
  ${({ customPosition }) => {
    return customPosition ? `bottom: 7%;` : `  top: 50%;`;
  }}

  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%);
  overflow: visible;
  color: white;
  border-radius: 8px;

  :hover {
  }
`;

const SidePanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 75px;
  height: 75px;
  transform: rotate(45deg);
  overflow: visible;

  border-width: 2px;
  border-color: ${({ theme }) => theme.primary};
  border-style: solid;
  border-radius: 10px;

  ${({ active, theme }) => {
    return active
      ? `  
       background-color:  ${theme.primary};`
      : `  
      background-color: #ffff;`;
  }}

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    cursor: pointer;
    border-color: transparent;

    ${Icon} {
      background: url(${({ src2 }) => src2}) no-repeat center;
      background-size: 100%;
      transform: translateY(-5px);
    }
    ${Text} {
      opacity: 1;
      transition: opacity 200ms;
      transition-delay: 100ms;
    }
  }
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  margin: 30px 10px 5px auto;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }
  .MuiDialog-scrollPaper {
  }

  .MuiDialog-paper {
    min-width: 900px;

    border-radius: 16px;
    background: #f6f8f7;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #f6f8f7;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const DialogTitleTwo = styled(DialogTitle)`
  justify-content: center;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const CSSection = styled.div`
  background: ${({ theme }) => theme.primary};
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

const CSSectionContent = styled.div`
  min-height: 100%;
  min-width: 100%;
  background: white;
  border-radius: 10px;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const CSActualContent = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto auto;
  padding: 30px;
`;

const QRCodeContainer = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 30px;
`;

const QRCodeHolder = styled.div`
  display: flex;
  padding: 20px;
`;

const QRCodeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRCodeText = styled.div`
  padding: 5px 0px;
  font-weight: bold;
  font-size: 20px;
`;

const CSButtonContainer = styled.div`
  padding: 10px;
  text-align: center;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
`;

const IconHolder = styled.img`
  height: auto;
  width: 75px;
`;

const Icons = styled.img`
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const QRCodeImage = styled.img`
  height: 150px;
  width: 150px;
`;

const DownloadButton = styled.div`
cursor: pointer;
 margin-top: 30px;
 margin-right: 10px;
  border: solid 3px ${({ theme }) => theme.primary};
  background: #fff;
  border-radius: 10px
  display: flex;
  justify-content: center;
  align-items: center;

  width: 75px;
  height: 75px;
  transform: rotate(45deg);
  overflow: visible;

  border-width: 2px;
  border-color: ${({ theme }) => theme.primary};
  border-style: solid;
  border-radius: 10px;
`;

const DownloadContent = styled.div`
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DownloadText = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  text-align: center;
  width: 50px;
  margin-top: -10px;
  font-weight: bold;
`;

const AnotherFloatPanel = (props) => {
  const [supportModal, setSupportModal] = useState(false);
  const [csModal, setCsModal] = useState(false);

  const performOpenSupportModal = () => {
    setSupportModal(true);
  };
  const performOpenCsModal = () => {
    props.onhandleShowCSClick();
  };

  const performCloseSupportModal = () => {
    setSupportModal(false);
  };
  const performCloseCsModal = () => {
    setCsModal(false);
  };

  const buttons = [
    {
      icon: "/icon-01.png",
      name: i18n.t("panel.liveChatOptionFund"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: "/icon-02.png",
      name: i18n.t("panel.liveChatOptionBall"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: "/icon-03.png",
      name: i18n.t("panel.liveChatOptionLive"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: "/icon-04.png",
      name: i18n.t("panel.liveChatOptionLottery"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: "/icon-05.png",
      name: i18n.t("panel.liveChatOptionRegister"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: "/icon-06.png",
      name: i18n.t("panel.liveChatOptionSlot"),
      click: props.onhandleShowCSClick,
    },
  ];
  return (
    <div>
      <Container customPosition={config.features.Home_CustomFPPosition}>
        {props.general.livechat && !config.features.LiveChatVendor && (
          <SidePanel
            active={csModal}
            onClick={() => {
              performOpenCsModal();
            }}
            src2={utility.imagePathGenerator(commonpath + "/01-3.png")}
          >
            <RotateBack active={csModal}>
              <Icon
                src={utility.imagePathGenerator(commonpath + "/01-1.png")}
                src2={utility.imagePathGenerator(commonpath + "/01-3.png")}
                active={csModal}
                alt="user-icon"
              />

              <Text active={csModal}>
                {config.features.FloatPanel_CustomTranslation
                  ? i18n.t("mess888.panel.cs")
                  : i18n.t("panel.cs")}
              </Text>
            </RotateBack>
          </SidePanel>
        )}

        <SidePanel
          active={supportModal}
          onClick={() => {
            performOpenSupportModal();
          }}
          src2={utility.imagePathGenerator(commonpath + "/02-3.png")}
        >
          <RotateBack active={supportModal}>
            <Icon
              src={utility.imagePathGenerator(commonpath + "/02-1.png")}
              src2={utility.imagePathGenerator(commonpath + "/02-3.png")}
              active={supportModal}
              alt="user-cs"
            />
            <Text active={supportModal}>
              {config.features.FloatPanel_CustomTranslation
                ? i18n.t("mess888.panel.im")
                : i18n.t("panel.im")}
            </Text>
          </RotateBack>
        </SidePanel>

        {config.features.HaveDownloadFeature &&
          !config.features.FloatPanel_NoDownloadAnimation && (
            <SidePanel
              active={supportModal}
              onClick={() => {
                AppHistory.replace("/download");
              }}
              src2={utility.imagePathGenerator(commonpath + "/001-1.png")}
            >
              <RotateBack active={supportModal}>
                <Icon
                  src={utility.imagePathGenerator(commonpath + "/001-2.png")}
                  src2={utility.imagePathGenerator(commonpath + "/001-1.png")}
                  active={supportModal}
                  alt="user-cs"
                />
                <Text active={supportModal}>
                  {config.features.FloatPanel_CustomTranslation
                    ? i18n.t("mess888.panel.download")
                    : i18n.t("download.title")}{" "}
                </Text>
              </RotateBack>
            </SidePanel>
          )}
        {config.features.FloatPanel_NoDownloadAnimation && (
          <DownloadButton
            onClick={() => {
              AppHistory.replace("/download");
            }}
          >
            <DownloadContent>
              <Icon
                src={utility.imagePathGenerator(commonpath + "/001-2.png")}
                alt="user-cs"
                style={{ marginTop: -15 }}
              />
              <DownloadText>APP</DownloadText>
            </DownloadContent>
          </DownloadButton>
        )}
      </Container>

      <CustomModal open={supportModal} onClose={performCloseSupportModal}>
        <DialogTitle2>
          <div>{i18n.t("panel.imLong")}</div>
          <CloseButton onClick={performCloseSupportModal}>✖</CloseButton>
        </DialogTitle2>
        <QRCodeContainer>
          {props.general.brandsSupport.map((data, index) => {
            return (
              <QRCodeHolder key={index}>
                {data.qrcodeurl ? (
                  <QRCodeTextContainer>
                    <QRCodeImage src={data.qrcodeurl} />
                    <QRCodeText>{data.type}</QRCodeText>
                  </QRCodeTextContainer>
                ) : (
                  <QRCodeTextContainer>
                    <Icons
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/icon/${data.type}.png`
                      }
                      onClick={() => {
                        IMHandler(data.type, data.phone);
                      }}
                    />
                    <QRCodeText>{data.type}</QRCodeText>
                    <div style={{ textAlign: "center" }}>
                      {i18n.t("common.phoneNumber")}: {data.phone}
                    </div>
                    <div>ID: {data.appid}</div>
                  </QRCodeTextContainer>
                )}
              </QRCodeHolder>
            );
          })}
        </QRCodeContainer>
      </CustomModal>

      <CustomModal open={csModal} onClose={performCloseCsModal}>
        <DialogTitleTwo>
          <div>{i18n.t("panel.liveChatWelcome")}</div>
          <CloseButton onClick={performCloseCsModal}>✖</CloseButton>
        </DialogTitleTwo>
        <CSSection>
          <CSSectionContent>
            {i18n.t("panel.liveChatDescription")}
          </CSSectionContent>
        </CSSection>
        <CSActualContent>
          {buttons.map((data, index) => {
            return (
              <CSButtonContainer onClick={data.click}>
                <div>
                  <IconHolder
                    src={utility.imagePathGenerator(commonpath + data.icon)}
                    alt={data.name}
                  />
                </div>

                <div>{data.name}</div>
              </CSButtonContainer>
            );
          })}
        </CSActualContent>
      </CustomModal>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBrandCommunicationList: (language) =>
      dispatch(generalAction.getBrandCommunication()),
  };
};
const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AnotherFloatPanel);
