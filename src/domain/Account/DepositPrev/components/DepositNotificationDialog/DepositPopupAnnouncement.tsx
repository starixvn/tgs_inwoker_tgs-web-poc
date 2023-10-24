import React from "react";
import styled from "styled-components";
import { Dialog } from "@mui/material";
import { useHistory } from "react-router-dom"; // Import useHistory
import i18n from "@/utils/i18n";
import { Button } from "@/components/UI/Button";

const Container = styled.div`
  background: ${({ theme }) => theme.primaryLight};
  color: white;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  padding: 20px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
// const CloseButton = styled.div<{ theme: Theme & { primary: string } }>`
const CloseButton = styled.div`
  background: ${({ theme }) => theme.primary};
  width: 100%;
  color: white;
  padding: 12px;
  font-size: 1.56rem;
  border-radius: 12px;
  text-align: center;
`;
const TitleContainer = styled.div`
  text-align: center;
  font-size: 1.812rem;
  font-weight: 700;
`;
const FormContainer = styled.div`
  margin: 30px 60px 40px 60px;
  padding: 0 3px;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  text-align: justify;
  overflow: auto;
  max-height: 50vh;
`;

const ContentContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: 0 3px;
  overflow: auto;
  height: 800px;
`;

type ImageBannerProps = {
  img: string;
  order: any;
};
const ImageBanner = styled.div<ImageBannerProps>`
  background: url(${({ img }: any) => img}) no-repeat center;
  height: 200px;
  width: 560px;
  border-radius: 5px;
  background-size: 100%;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);
`;

type Props = {
  open: boolean;
  onClose: () => void;
  header?: string;
  type?: string;
  content?: any[];
  text?: string;
};

const DepositPopupAnnouncement = ({
  open,
  onClose,
  header,
  type,
  content,
  text,
}: Props) => {
  const history = useHistory(); // Initialize history hook

  const handlePromotionClick = (id: string) => {
    history.push(`/promotion/${id}`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
      <Container>
        <div className="clear" />
        <TitleContainer>{header}</TitleContainer>

        {type === "promo" && content ? (
          <ContentContainer>
            {content
              .sort((a, b) => {
                return a.order - b.order;
              })
              .map((data, index) => {
                var checkLocale = data.localization[i18n.language];
                return (
                  <ImageBanner
                    img={
                      checkLocale ? checkLocale.mobileBanner : data.mobileBanner
                    }
                    key={index}
                    order={data.order}
                    onClick={() => {
                      handlePromotionClick(data.id);
                    }}
                  />
                );
              })}
          </ContentContainer>
        ) : (
          <FormContainer
            dangerouslySetInnerHTML={{
              __html: text?.replace(/\n/g, "<br />") || "",
            }}
          />
        )}

        <Button fullWidth onClick={onClose}>
          {i18n.t("common.confirm")}
        </Button>
      </Container>
    </Dialog>
  );
};

export default DepositPopupAnnouncement;
