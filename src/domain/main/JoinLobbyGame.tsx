import Loading from "@/components/UI/Loading";
import Maintenance from "@/pages/Maintenance";
import { GameService } from "@/services/GameService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JoinLobbyGame = () => {
  const { gameType, gpCode } = useParams<{ gameType: string; gpCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    const joinLobbyGame = async () => {
      const joinLobbyGameRes = await GameService.JoinLobbyGame(
        gameType,
        gpCode
      );

      if (joinLobbyGameRes.IsSuccess) {
        window.location.href = joinLobbyGameRes.data.url;
      } else {
        handleJoinGameMaintenance();
      }
    };

    joinLobbyGame();
  }, [gameType, gpCode]);

  const handleJoinGameMaintenance = () => {
    setIsMaintenance(true);
    setIsLoading(false);
  };

  if (isMaintenance) {
    return <Maintenance isGameMaintenance={true} />;
  }

  return <Loading show={isLoading} noShrink={true} opacity={1} />;
};

export default JoinLobbyGame;
