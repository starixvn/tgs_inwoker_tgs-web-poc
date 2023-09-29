import { Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import IMHandler from "@/components/Wap/components/Main/Support/IMHandler";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { BrandCommunication } from "@/models/dto/general/GetBrandCommunicationResDto";
import { useUiService } from "@/hooks/services/useUiService";
import { useHistory } from "react-router-dom";

const MaintenanceBg = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${({ image }) => {
      return process.env.PUBLIC_URL + `/assets/images/wapp/${image}.jpg`;
    }})
    no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const CustomContainer = styled(Grid)`
  padding: 140px 0px 0px 0px;
`;
const Text = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  padding: 20px 40px;
  white-space: pre-wrap;
`;

const Hyperlink = styled.span`
  :focus,
  :active {
    text-decoration: underline;
  }
`;

const Overlay = styled.div`
  position: fixed;
  display: ${({ open }) => {
    return open ? "flex" : "none";
  }};
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 100vh;
  top: 0;
  bottom: 0;
  padding: 80px;
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border-radius: 10px;
  background: white;
`;

const OverlayHeader = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 20px;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
`;

const OverlayBody = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const IMWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  padding: 20px;
`;

const Icon = styled.div`
  width: 150px;
  height: 150px;

  background: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + "/assets/images/icon/" + icon
    }) no-repeat center /
    contain;`;
  }};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.div`
  color: white;
  font-size: 30px;
  background: #ff8e39;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const AnotherButton = styled(Button)`
  color: #ff8e39;
  background: none;
  border: solid 1px #ff8e39;
`;

const SMType = styled.div`
  padding: 5px 0px;
  font-weight: bold;
`;

const TheText = styled.div`
  font-size: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Maintenance = (props) => {
  function csClick() {
    props.GetSupportUrl("", "", "", "");
  }

  const maintenanceImageSwitcher = (template) => {
    switch (template) {
      case 8:
      case "8":
        return "maintenance-new";
      default:
        return "maintenance";
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [imList, setIMList] = useState<BrandCommunication[]>([]);

  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");
  const [isFailed, setFailed] = useState(false);

  const { getBrandCommunication } = useGeneralStore();
  const { GetMaintenance } = useUiService();
  const history = useHistory();

  const fetchMaintenanceInfo = useCallback(async () => {
    const getBrandCommunicationRes = await getBrandCommunication();
    if (getBrandCommunicationRes.IsSuccess) {
      setIMList(getBrandCommunicationRes.data);
    }

    const gerMaintenanceRes = await GetMaintenance();
    if (!gerMaintenanceRes.IsSuccess || !gerMaintenanceRes.data) {
      setFailed(true);
      return;
    }

    if (gerMaintenanceRes.data.beginTime) {
      setBeginTime(gerMaintenanceRes.data.beginTime);
    }
    if (gerMaintenanceRes.data.beginTime) {
      setEndTime(gerMaintenanceRes.data.endTime);
    }
    if (gerMaintenanceRes.data.content) {
      setContent(gerMaintenanceRes.data.content);
    }
  }, []);

  useEffect(() => {
    fetchMaintenanceInfo;
  }, []);

  const handleCSClick = (userid = "", name = "", question = "", email = "") => {
    props.GetSupportUrl("", "", "");
  };

  const formatTime = (isoString) => {
    var newDate = new Date(isoString);
    var hours: string | number = newDate.getHours();
    var minutes: string | number = newDate.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + ampm;
  };

  const Api = () => {
    return (
      <TextContainer>
        <Text>
          {i18n.t("common.maintenance")}: <br />
          {beginTime} ~ {endTime} (GMT+8){" "}
        </Text>
        <Text
          style={{ color: "#fff" }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </TextContainer>
    );
  };

  const MaintenanceMessage = ({ beginTime, endTime }) => {
    return (
      <>
        <Text>我们现正维护中，请稍后再试。 </Text>
        <Text>
          如您有任何问题，请
          <Hyperlink onClick={csClick}>联系客服</Hyperlink>。
        </Text>
        <Text>
          維修時間 :{" "}
          {beginTime
            ? beginTime
            : formatTime(config.features.Maintenance_Detail.startTime)}{" "}
          ~{" "}
          {endTime
            ? endTime
            : formatTime(config.features.Maintenance_Detail.endTime)}{" "}
          (GMT+8){" "}
        </Text>
        {(() => {
          if (i18n.language === "vi-VN") {
            return (
              <React.Fragment>
                <Text>
                  Chúng tôi hiện đang được bảo trì, vui lòng thử lại sau.
                </Text>
                <Text>
                  Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi{" "}
                  <Hyperlink onClick={csClick}>dịch vụ khách hàng</Hyperlink>。
                </Text>
                <Text>
                  thời gian bảo trì :{" "}
                  {beginTime
                    ? beginTime
                    : formatTime(
                        config.features.Maintenance_Detail.startTime
                      )}{" "}
                  ~{" "}
                  {endTime
                    ? endTime
                    : formatTime(
                        config.features.Maintenance_Detail.endTime
                      )}{" "}
                  (GMT+8){" "}
                </Text>
              </React.Fragment>
            );
          }
        })()}

        <Text>
          We are currently under maintenance, <br /> please try again later.
        </Text>
        <Text>
          If you have any questions, <br />
          please contact our{" "}
          <Hyperlink onClick={csClick}>customer service</Hyperlink>.
        </Text>
        <Text>
          Maintenance Time :{" "}
          {beginTime
            ? beginTime
            : formatTime(config.features.Maintenance_Detail.startTime)}{" "}
          ~{" "}
          {endTime
            ? endTime
            : formatTime(config.features.Maintenance_Detail.endTime)}{" "}
          (GMT+8){" "}
        </Text>
      </>
    );
  };

  return (
    <MaintenanceBg image={maintenanceImageSwitcher(config.wapVersion)}>
      <CustomContainer container justifyContent="center" alignItems="center">
        {isFailed ? (
          <MaintenanceMessage />
        ) : content ? (
          <Api />
        ) : (
          <MaintenanceMessage beginTime={beginTime} endTime={endTime} />
        )}
      </CustomContainer>

      <ButtonContainer>
        <AnotherButton
          onClick={() => {
            handleCSClick();
          }}
        >
          {i18n.t("support.online")}
        </AnotherButton>
        {(() => {
          if (imList.length > 0) {
            return (
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                {i18n.t("panel.im")}
              </Button>
            );
          }
        })()}
      </ButtonContainer>

      <Overlay open={isOpen}>
        <OverlayContent>
          <OverlayHeader>
            <div>{i18n.t("panel.im")}</div>
            <div
              onClick={() => {
                setIsOpen(false);
              }}
            >
              ✖
            </div>
          </OverlayHeader>
          <OverlayBody>
            {imList.map((data, index) => {
              return (
                <IMWrapper
                  onClick={() => {
                    IMHandler(data.type, data.phone);
                    // props.alert('', i18n.t('affiliate.copied'))
                  }}
                >
                  <Icon icon={`${data.type}.png`} />
                  <SMType>{data.type}</SMType>
                  <TheText style={{ textAlign: "center" }}>
                    {i18n.t("common.phoneNumber")}: {data.phone}
                  </TheText>
                  <TheText>ID: {data.appid}</TheText>
                </IMWrapper>
              );
            })}
          </OverlayBody>
        </OverlayContent>
      </Overlay>
    </MaintenanceBg>
  );
};

export default Maintenance;
