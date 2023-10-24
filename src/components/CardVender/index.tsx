import playIcon from "@/assets/images/home/mobile/play.svg";
import bg from "@/assets/images/home/mobile/vender_card_bg.png";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";
import { providerStatus } from "../../constants/games";

type Props = {
  imageUrl: string;
  gameName?: string;
  venderName?: string;
  venderLogoUrl?: string;
  launchGame: () => void;
  status: number;
  hoverVenderName?: string;
};

const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 10px;
  display: none;
  text-align: center;
`;

const HoverVenderName = styled.div`
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 16px;
  word-wrap:break-word;
`;

const CardVendorBg = styled.div`
  width: calc(33.33% - 10px);
  height: 158px; //to-do : dynamic heigh
  bottom: 0;
  background-image: url(${bg});
  background-size: cover;
  box-sizing: border-box;
  position: relative;

  ${media.sm} {
    width: calc(16.67% - 14px);
    min-width: 118px;
    padding-bottom: calc((16.67% - 14px) * 1.34);
    border-radius: 10px;

    &:hover ${CardHoverBg} {
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    &:hover ${HoverVenderName} {
      word-wrap:break-word;
    }
  }
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  width: 100%;
  padding-top: 91.5%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 10px 10px 0 0;
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  height: 60%;
  left: 0;
  bottom: 0;
  background: ${(props) => props.theme.primaryGradient};
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameName = styled.div`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: min(max(1.5vw, 1.2rem), 1.5rem);
  font-weight: 900;
  margin-bottom: 4px;
  text-align: center;
`;

const HoverGameName = styled.div`
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const VenderName = styled.div`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: min(max(1.5vw, 0.625rem), 0.75rem);
  font-weight: 400;
  text-align: center;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  display: inline-flex;
  width: 100%;
  max-width: 77px;
  min-height: 38px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 0 0 10px 10px;
  padding: 7px;
`;

const MaintenanceContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.primary};
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaintenanceText = styled.div`
  color: ${(props) => props.theme.white};
  font-size: 1.2rem;
  font-weight: 900;
  text-align: center;
`;

const CardVendor = ({
  imageUrl,
  gameName,
  venderName,
  venderLogoUrl,
  launchGame,
  status,
  hoverVenderName
}: Props) => {
  return (
    <CardVendorBg onClick={launchGame}>
      <>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <GradientBg>
          <CardContent>
            {gameName && <GameName>{gameName}</GameName>}
            {venderName && <VenderName>{venderName}</VenderName>}
            {venderLogoUrl && (
              <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>
            )}
          </CardContent>
        </GradientBg>
      </>
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceContent>
            <MaintenanceText> BE BACK SOON</MaintenanceText>
          </MaintenanceContent>
        </MaintenanceBg>
      )}
      <CardHoverBg>
        {gameName && <HoverGameName>{gameName}</HoverGameName>}
        {hoverVenderName && <HoverVenderName>{hoverVenderName}</HoverVenderName>}
        <img src={playIcon} alt={"play"} />
      </CardHoverBg>
    </CardVendorBg>
  );
};

export default CardVendor;
