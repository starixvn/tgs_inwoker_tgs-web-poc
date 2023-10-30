import playIcon from "@/assets/t18/images/home/mobile/play.svg";
import bg from "@/assets/t18/images/home/mobile/vender_card_bg.png";
import { providerStatus } from "@/constants/games";
import useDynamicFontSize from "@/hooks/useDynamicFontSize";
import { useRwd } from "@/hooks/useRwd";
import { media } from "@/theme/breakpoints";
import { useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
  imageUrl: string;
  gameName?: string;
  venderName?: string;
  venderLogoUrl?: string;
  launchGame: () => void;
  status: number;
  lobbyVenderName?: string;
};

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 10px;
  padding: 0 5px;
  display: none;
  white-space: pre-line;
  /* 畫面寬度改變才有換行 */
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  width: 100%;
  padding-top: 91.5%;
  left: 0;
  top: 0;
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
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HoverGameOrVenderName = styled(CardContent)`
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  text-align: center;
  margin-bottom: 16px;
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
`;

const CardVendorBg = styled.div`
  width: calc(33.33% - 10px);
  background-image: url(${bg});
  background-size: cover;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

    &::before {
    content: '';
    display: block;
    padding-top: calc(158 / 118 * 100%);
    width: 100%;
  }

  ${media.sm} {
    width: calc(16.67% - 24.4px);
    min-width: 118px;

    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const GameName = styled(CardContent)`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  font-weight: 900;
  margin-bottom: 4px;
  text-align: center;
`;

const VenderName = styled(CardContent)`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 0.625rem;
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
  lobbyVenderName,
}: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const gameNameRef = useRef<HTMLDivElement | null>(null);
  const venderNameRef = useRef<HTMLDivElement | null>(null);
  const lobbyVenderNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

  useEffect(() => {
    if (gameNameRef.current) {
      resizeText({ container: gameNameRef.current, text: gameNameRef.current });
    }
    if (venderNameRef.current) {
      resizeText({ container: venderNameRef.current, text: venderNameRef.current });
    }
    if (lobbyVenderNameRef.current) {
      resizeText({ container: lobbyVenderNameRef.current, text: lobbyVenderNameRef.current });
    }
  }, [resizeText, gameNameRef.current, venderNameRef.current, lobbyVenderNameRef.current]);

  return (
    <CardVendorBg onClick={launchGame}>
      <>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <GradientBg>
          <CardContent>
            {gameName && <GameName ref={gameNameRef}>{gameName}</GameName>}
            {venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>}
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

      {isDesktopSize && <CardHoverBg>
        {gameName && <HoverGameOrVenderName ref={lobbyVenderNameRef}>{gameName}</HoverGameOrVenderName>}
        {lobbyVenderName && (
          <HoverGameOrVenderName ref={lobbyVenderNameRef}>{lobbyVenderName}</HoverGameOrVenderName>
        )}
        <PlayIcon src={playIcon} alt={"play"} />
      </CardHoverBg>}
    </CardVendorBg>
  );
};

export default CardVendor;
