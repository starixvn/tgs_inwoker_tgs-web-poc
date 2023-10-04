import styled from "styled-components";
import { useEffect, useState } from "react";
import { useUiService } from "@/hooks/services/useUiService";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import i18n from "@/utils/i18n";
import Common from "@/utils/Common";
import { useHistory } from "react-router-dom";

const MaintenanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px - 82px);
  color: #ffffff;
`;
const MaintenanceBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/maintenance/maintenance_bg.png)
    no-repeat;
  background-size: cover;
`;

const ContentContainer = styled.div`
  position: absolute;
  left: 42px;
  top: 44px;
  width: 232px;
`;
const TextContainer = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  max-height: 300px;
  overflow: scroll;
`;
const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 12px;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 500;
`;
const CSButton = styled(Button)`
  background: linear-gradient(0deg, #e7415a, #e7415a),
    linear-gradient(0deg, rgba(231, 65, 90, 0.6), rgba(231, 65, 90, 0.6));
`;
const IMButton = styled(Button)`
  background: #6152dd;
`;

const DefaultMaintenance = () => {
  return (
    <>
      <p>We are currently under maintenance, please try again later.</p>
      <p>If you have any questions,please contact our customer service.</p>
    </>
  );
};
const Maintenance = () => {
  const history = useHistory();
  const { GetMaintenance } = useUiService();
  const {
    general: { livechat, brandsSupport },
  } = useGeneralStore();

  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");
  const [isFailed, setFailed] = useState(false);

  const handleCSClick = () => {
    const newURL = livechat.setting.url.replace("{lang}", i18n.language);
    if (newURL.length) {
      Common.PopupCenter(newURL, "", 785, 750);
    }
  };

  const handleIMClick = () => {
    // TODO: handle IM click
    console.log("%c⧭", "color: #d90000", "brandsSupport", brandsSupport);
    history.push("/support");
  };

  useEffect(() => {
    const fetchGetMaintenance = async () => {
      await GetMaintenance().then((result) => {
        if (result.IsSuccess) {
          if (result.data) {
            if (result.data.beginTime) {
              setBeginTime(result.data.beginTime);
            }
            if (result.data.beginTime) {
              setEndTime(result.data.endTime);
            }
            if (result.data.content) {
              setContent(result.data.content);
            }
          }
        } else {
          setFailed(true);
        }
      });
    };
    fetchGetMaintenance();
  }, []);

  const showImButton = brandsSupport.length > 0;
  return (
    <MaintenanceContainer>
      <MaintenanceBg />
      <ContentContainer>
        <TextContainer>
          {isFailed && <DefaultMaintenance />}
          {content && (
            <>
              <p>
                {i18n.t("common.maintenance")}: <br />
                {beginTime} ~ {endTime} (GMT+8){" "}
              </p>
              <p
                style={{ color: "#ffffff" }}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </>
          )}
        </TextContainer>
        <ButtonGroupContainer>
          <CSButton onClick={handleCSClick}>Contact Customer</CSButton>
          {showImButton && (
            <IMButton onClick={handleIMClick}>Instant Messaging</IMButton>
          )}
        </ButtonGroupContainer>
      </ContentContainer>
    </MaintenanceContainer>
  );
};

export default Maintenance;
