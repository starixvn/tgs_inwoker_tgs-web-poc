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
  display: none;
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

    &:hover ${CardHoverBg} {
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameName = styled(CardContent)`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: min(max(1.5vw, 1.2rem), 1.5rem);
  font-weight: 900;
  margin-bottom: 4px;
  text-align: center;
`;

const VenderName = styled(CardContent)`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: min(max(1vw, 0.625rem), 0.75rem);
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

const HoverGameName = styled.div`
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const HoverVenderName = styled(CardContent)`
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
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
  const { isDesktopSize } = useRwd();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

  useEffect(() => {
    if (contentRef.current) {
      resizeText(contentRef.current, contentRef.current?.firstChild as HTMLElement);
    }
  }, [resizeText, contentRef]);
  return (
    <CardVendorBg onClick={launchGame}>
      <>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <GradientBg>
          <CardContent>
            {gameName && <GameName ref={contentRef}>{gameName}</GameName>}
            {venderName && <VenderName ref={contentRef}>{venderName}</VenderName>}
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
        {gameName && <HoverGameName>{gameName}</HoverGameName>}
        {lobbyVenderName && (
          <HoverVenderName ref={contentRef}>{lobbyVenderName}</HoverVenderName>
        )}
        <PlayIcon src={playIcon} alt={"play"} />
      </CardHoverBg>}
    </CardVendorBg>
  );
};

export default CardVendor;
