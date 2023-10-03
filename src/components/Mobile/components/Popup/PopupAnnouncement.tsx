import DialogPopup from "@/components/Mobile/components/UI/Dialog/DialogPopup";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Carousel from "@/components/Mobile/components/UI/Carousel";
import { themeList } from "@/theme";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { checkInHomePage } from "@/utils/checkUrlParams";
import IconCheckBox from "@/assets/images/checkbox.svg";

const theme = themeList["mobileT18"];
const dialogBgUrl =
  process.env.PUBLIC_URL + "/assets/images/announcement/announcement_bg.png";

const doNotShowAnnouncementDialogKey = "doNotShowAnnouncementDialog";

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  margin-top: 1rem;
  line-height: 1.2rem;
`;

const Button = styled.div`
  width: 90%;
  height: 52px;
  text-align: center;
  font-size: 1.6rem
  color: #ffffff; 
  background: #6152DD;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
`;

const AnnouncementCardContainer = styled.div`
  padding: 20px;
`;

const NotShowAgainHint = styled.div`
  background: ${theme.primaryLight};
  width: 171px;
  height: 38px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: calc(50% + 149px);
  z-index: 99;
  color: #ffffff;
  border-radius: 50px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
`;

const CheckBox = styled.div<{ isCheck: boolean }>`
  width: 18px;
  height: 18px;
  background: ${(props) =>
    props.isCheck ? `url(${IconCheckBox}) no-repeat center center;` : null};
  margin-right: 10px;
  border: ${(props) => (props.isCheck ? "0" : "1px")} solid #ffffff;
  border-radius: 5px;
`;

const AnnouncementCard = ({
  subject,
  content,
}: {
  subject: string;
  content: string;
}) => {
  return (
    <AnnouncementCardContainer>
      <Title>{subject}</Title>
      <Content>{content}</Content>
    </AnnouncementCardContainer>
  );
};

const PopupAnnouncement = () => {
  const disableDialog =
    window.sessionStorage &&
    sessionStorage.getItem(doNotShowAnnouncementDialogKey) === "true";

  const [open, setOpen] = useState(!disableDialog);
  const [isCheck, setIsCheck] = useState(false);

  const { ui } = useUiStore();
  const { mains: announcementList } = ui;

  useEffect(() => {
    if (disableDialog) return;
    const hasData = announcementList.length > 0;
    const dataChanged =
      JSON.stringify(announcementList) !== JSON.stringify(ui.mains);
    if (hasData || dataChanged) {
      setOpen(true);
    }
  }, [announcementList]);

  const handleCloseDialog = () => {
    if (isCheck) {
      sessionStorage.setItem(doNotShowAnnouncementDialogKey, "true");
    }
    setOpen(false);
  };

  const handleClickCheckbox = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };

  const isInHomePage = checkInHomePage();
  if (!isInHomePage) return null;

  return (
    <DialogPopup
      isOpen={open}
      handleCloseDialog={handleCloseDialog}
      type="announcement"
      bgUrl={dialogBgUrl}
    >
      <>
        <Carousel>
          {announcementList.map((announcement, index) => {
            return (
              <AnnouncementCard
                key={index}
                subject={announcement.subject}
                content={announcement.content}
              />
            );
          })}
        </Carousel>
        <Button onClick={handleCloseDialog}>Got It!</Button>
        <NotShowAgainHint onClick={handleClickCheckbox}>
          <CheckBox isCheck={isCheck} />
          Don't show again
        </NotShowAgainHint>
      </>
    </DialogPopup>
  );
};

export default PopupAnnouncement;
