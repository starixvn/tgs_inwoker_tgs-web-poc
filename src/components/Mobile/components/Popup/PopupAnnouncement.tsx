import DialogPopup from "@/components/Mobile/components/UI/Dialog/DialogPopup";
import styled from "styled-components";
import { useState } from "react";
import Carousel from "@/components/Mobile/components/UI/Carousel";
import { themeList } from "@/theme";
import { ANNOUNCEMENT } from "@/components/Mobile/constants/dialog";

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
`

const AnnouncementCard = ({
  subject,
  content
}: {
  subject: string;
  content: string;
}) => {
  return (
    <AnnouncementCardContainer>
      <Title>{subject}</Title>
      <Content>{content}</Content>
    </AnnouncementCardContainer>
  )
}
const PopupAnnouncement = () => {
  // fake data
  const announcementList = [
    {
      subject: "Play Hard Win Big at PG Casino!",
      content: `Enjoy 300% Welcome Package! UNLIMITED Weekly 1.5% Rebates and Cashback is waiting for you.`,
    },
    {
      subject: "Play Hard Win Big at PG Casino!",
      content: `Enjoy 300% Welcome Package! UNLIMITED Weekly 1.5% Rebates and Cashback is waiting for you.`,
    }
  ]

  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(true);
  const handleCloseDialog = () => {
    setIsAnnouncementOpen(false);
  }

  return (
      <DialogPopup isOpen={isAnnouncementOpen} handleCloseDialog={handleCloseDialog} type={ANNOUNCEMENT}>
        <Carousel>
          {
            announcementList.map((announcement, index) => {
              return (
                <AnnouncementCard
                  key={index}
                  subject={announcement.subject}
                  content={announcement.content}
                />
              )
            })
          }
        </Carousel>
      </DialogPopup>
  )
}

export default PopupAnnouncement