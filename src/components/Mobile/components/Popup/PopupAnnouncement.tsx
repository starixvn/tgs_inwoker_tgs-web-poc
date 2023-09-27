import DialogPopup from "@/components/Mobile/components/UI/Dialog/DialogPopup";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Carousel from "@/components/Mobile/components/UI/Carousel";
import { themeList } from "@/theme";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { checkInHomePage } from "@/utils/checkUrlParams";

const theme = themeList["mobileT18"];

const Title = styled.div`
  font-size: 1.5rem;
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
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const { ui } = useUiStore();
  const { mains: announcementList } = ui;

  useEffect(() => {
    const hasData = announcementList.length > 0;
    const dataChanged =
      JSON.stringify(announcementList) !== JSON.stringify(ui.mains);
    if (hasData || dataChanged) {
      setOpen(true);
    }
  }, [announcementList]);

  const isInHomePage = checkInHomePage();
  if (!isInHomePage) return null;

  return (
    <DialogPopup isOpen={open} handleCloseDialog={handleCloseDialog}>
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
    </DialogPopup>
  );
};

export default PopupAnnouncement;
