import DialogPopup from "@/components/Mobile/components/UI/Dialog/DialogPopup";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Carousel from "@/components/Mobile/components/UI/Carousel";
import { themeList } from "@/theme";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { checkInHomePage } from "@/utils/checkUrlParams";
import NotShowAgainHint from "@/components/Mobile/components/Popup/NotShowAgainHint";
import { Dialog as MuiDialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { UpTransition } from "@/components/Mobile/components/UI/Dialog/Transition";

const theme = themeList["mobileT18"];
const dialogBgUrl =
  process.env.PUBLIC_URL + "/assets/images/announcement/announcement_bg.png";

const doNotShowAnnouncementDialogKey = "doNotShowAnnouncementDialog";

const DialogContainer = styled(MuiDialog)`
  & .MuiPaper-root {
    background: url(${dialogBgUrl}) no-repeat center center !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 321px;
    height: 283px;
    border-radius: 10px;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
`;

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
    <DialogContainer open={open} TransitionComponent={UpTransition}>
      <ChildContainer>
        <Carousel>
          {announcementList
            .sort((a, b) => a.order - b.order)
            .map((announcement, index) => {
              const subject =
                announcement.localization?.subject || announcement.subject;
              const content =
                announcement.localization?.content || announcement.content;
              return (
                <AnnouncementCard
                  key={index}
                  subject={subject}
                  content={content}
                />
              );
            })}
        </Carousel>
        <Button onClick={handleCloseDialog}>Got It!</Button>
        <NotShowAgainHint onClick={handleClickCheckbox} isCheck={isCheck} />
        <CloseIconContainer>
          <CloseIcon
            onClick={handleCloseDialog}
            style={{
              color: "white",
            }}
          />
        </CloseIconContainer>
      </ChildContainer>
    </DialogContainer>
  );
};

export default PopupAnnouncement;
