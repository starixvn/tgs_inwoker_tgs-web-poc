import React from "react";
import config from "@/config/config";
import i18n from "@/utils/i18n";
import styled from "styled-components";

const Text = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  padding: 20px 40px;
  white-space: pre-wrap;
`;

type Props = {
  beginTime: string;
  endTime: string;
};
const MaintenanceMessage = ({ beginTime, endTime }: Props) => {
  function csClick() {
    props.GetSupportUrl("", "", "", "");
  }

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
                  : formatTime(config.features.Maintenance_Detail.endTime)}{" "}
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

export default MaintenanceMessage;
