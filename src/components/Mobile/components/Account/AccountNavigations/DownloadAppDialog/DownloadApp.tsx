import logoCompatibleImg from "@/assets/images/account/download/logo_compatible.svg";
import logoConvenientImg from "@/assets/images/account/download/logo_convenient.svg";
import logoExtensiveImg from "@/assets/images/account/download/logo_extensive.svg";
import logoSecureImg from "@/assets/images/account/download/logo_secure.svg";
import downloadGirlImg from "@/assets/images/account/girl/download.png";
import DownloadButtonGroup from "@/components/Mobile/components/Account/AccountNavigations/DownloadAppDialog/DownloadButtonGroup";
import InfoCard, {
    InfoCardItem,
} from "@/components/Mobile/components/Account/AccountNavigations/DownloadAppDialog/InfoCard";
import { themeList } from "@/theme";
import styled from "styled-components";

const theme = themeList["mobileT18"];

const DownloadAppContainer = styled.div``;

const GirlImage = styled.div`
  width: 100%;
  margin-bottom: 10px;

  img {
    width: 100%;
  }
`;

const IntroductionContainer = styled.div`
  color: ${theme.white};
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.318rem;
  margin-bottom: 10px;
`;

const InfoCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const infoCardItemList: InfoCardItem[] = [
    {
        title: "COMPATIBLE",
        content: "app supports any ios and android devices.",
        logo: logoCompatibleImg,
    },
    {
        title: "SECURE",
        content: "Android and ios replicates teh same safety standards.",
        logo: logoSecureImg,
    },
    {
        title: "EXTENSIVE",
        content:
            "Access to more than 1000+ games including sports betting and more.",
        logo: logoExtensiveImg,
    },
    {
        title: "CONVENIENT",
        content: "User friendly interface simple, clear, and extremely engaging.",
        logo: logoConvenientImg,
    },
];

type Props = {};
const DownloadApp = (props: Props) => {
    return (
        <DownloadAppContainer>
            <GirlImage>
                <img src={downloadGirlImg} alt={"download"} />
            </GirlImage>

            <IntroductionContainer>
                <p>Introduction</p>
                <p>
                    The Mobile Casino App transfers all the powers of our site onto your
                    fingertips. We are available for IOS and Android that features a
                    multitude of entertaining games.
                </p>
            </IntroductionContainer>

            <InfoCardListContainer>
                {infoCardItemList.map((infoCardItem) => {
                    return (
                        <InfoCard key={infoCardItem.title} infoCardItem={infoCardItem} />
                    );
                })}
            </InfoCardListContainer>

            <DownloadButtonGroup alert />
        </DownloadAppContainer>
    );
};

export default DownloadApp;
