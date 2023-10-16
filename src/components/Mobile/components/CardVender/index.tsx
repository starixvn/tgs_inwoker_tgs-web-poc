import { GameService } from "@/api-services/services/GameService";
import { GameTypeEnum } from "@/api-services/utils/Enum";
import bg from "@/assets/images/home/mobile/vender_card_bg.png";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import Common from "@/utils/Common";
import { useHistory } from "react-router";
import styled from "styled-components";

type Props = {
  imageUrl: string;
  gameName?: string;
  venderName?: string;
  venderLogoUrl?: string;
  gpCode: string;
  gameType: number;
};

const CardVendorBg = styled.div`
  width: calc(33.33% - 10px);
  height: 158px; //to-do : dynamic heigh
  bottom: 0;
  background-image: url(${bg});
  background-size: cover;
  box-sizing: border-box;
  position: relative;
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
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 4px;
`;

const VenderName = styled.div`
   color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 0.625rem;
  font-weight: 400;
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

const CardVendor = ({
  imageUrl,
  gameName,
  venderName,
  venderLogoUrl,
  gpCode,
  gameType,
}: Props) => {
  const { account } = useAccountStore();
  const history = useHistory();

  const launchLobbyGame = () => {
    if (!account.token) {
      history.push("/login");
    } else {
      if (gameType === GameTypeEnum.COCKFIGHT) {
        // 以後SM01不會開,多新增AWC_COCKFIGHT(缺對應api)
        if (gpCode === "SM01") {
          const gameWindow = window.open("", "Cockfight");
          if (gameWindow) {
            GameService.GetCockfight()
              .then((res) => {
                gameWindow.document.write(res?.data);
                gameWindow.document.close();
                gameWindow.focus();
              })
              .catch(() => {
                gameWindow.close();
              });
          }
        }
        else {
          Common.closePreviousPopup();
          Common.PopupCenter(
            "/joinlobbygame/" + GameTypeEnum.SPORTS + "/" + gpCode,
            "gamewindow"
          );
        }
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter("/joinlobbygame/" + gameType, "gamewindow");

        const gameWindow = window.open("", "gamewindow");

        if (gameWindow) {
          GameService.JoinLobbyGame(gameType, gpCode).then((response) => {
            if (response?.IsSuccess) {

              gameWindow.location.href = response?.data?.url;
            } else {
              console.log(response?.info);
              gameWindow.close();
            }
          });
        }
      }
    }
  };

  return (
    <CardVendorBg onClick={launchLobbyGame}>
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
    </CardVendorBg>
  );
};

export default CardVendor;
