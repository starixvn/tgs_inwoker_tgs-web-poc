import React, { useEffect, useState } from "react";
import Loading from "@/components/UI/Loading";
import { GameTypeEnum } from "@/api-services/utils/Enum";
import Maintenance from "@/pages/Maintenance";
import { useParams } from "react-router-dom";
import { GameService } from "@/services/GameService";

type JoinGameProps = {};

const JoinGame = ({}: JoinGameProps) => {
  const { gameId, gpCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    const joinGame = async () => {
      const getGameUrlRes = await GameService.JoinGame(gameId, gpCode);

      if (getGameUrlRes.IsSuccess) {
        window.location.href = getGameUrlRes.data.url;
      } else {
        handleJoinGameMaintenance(getGameUrlRes);
      }
    };

    joinGame();
  }, [gpCode]);

  const handleJoinGameMaintenance = (response: any) => {
    setIsMaintenance(true);
    setLoading(false);
  };

  return isMaintenance ? (
    <Maintenance isGameMaintenance={true} />
  ) : (
    <Loading show={loading} noShrink={true} opacity={1} />
  );
};

export default JoinGame;
