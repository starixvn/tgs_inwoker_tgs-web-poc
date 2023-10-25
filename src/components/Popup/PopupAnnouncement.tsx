import styled from "styled-components";
import { useState } from "react";
import Carousel from "@/components/UI/Carousel";
import { useUiStore } from "@/hooks/stores/useUiStore";
import NotShowAgainHint from "@/components/Popup/NotShowAgainHint";
import { Dialog as MuiDialog } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/hooks/useRwd";

const mobileBgUrl =
  process.env.PUBLIC_URL + "/assets/images/announcement/mobile_bg.png";

const desktopBgUrl =
  process.env.PUBLIC_URL + "/assets/images/announcement/desktop_bg.png";

const doNotShowAnnouncementDialogKey = "doNotShowAnnouncementDialog";

const DialogContainer = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    background: url(${mobileBgUrl}) no-repeat center center !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 321px;
    height: 283px;
    border-radius: 10px;

    ${media.sm} {
      width: 652px;
      height: 386px;
      background: url(${desktopBgUrl}) no-repeat center center !important;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: calc(283px - 20px - 20px);
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

  ${media.sm} {
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
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

  ${media.sm} {
    font-size: 2rem;
    width: 281px;
    height: 53px;
  }
`;

const AnnouncementCardContainer = styled.div`
  padding: 20px;
  height: calc(283px - 52px - 20px - 20px);
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

const PopupAnnouncement = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const disableDialog =
    window.sessionStorage &&
    sessionStorage.getItem(doNotShowAnnouncementDialogKey) === "true";

  const [isCheck, setIsCheck] = useState(false);

  const { isMobileSize } = useRwd();
  const { ui } = useUiStore();
  const { mains: announcementList } = ui;

  const handleCloseDialog = () => {
    if (isCheck) {
      sessionStorage.setItem(doNotShowAnnouncementDialogKey, "true");
    }
    onClose();
  };

  const handleClickCheckbox = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };

  const isEmptyData = announcementList.length === 0;

  if (isEmptyData || disableDialog) return null;

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
        <NotShowAgainHint
          style={{
            top: isMobileSize ? "calc(50% + 140px)" : "calc(50% + 195px)",
          }}
          onClick={handleClickCheckbox}
          isCheck={isCheck}
        />
      </ChildContainer>
      <CloseIconContainer>
        <CloseIcon
          onClick={handleCloseDialog}
          style={{
            color: "white",
          }}
        />
      </CloseIconContainer>
    </DialogContainer>
  );
};

export default PopupAnnouncement;
