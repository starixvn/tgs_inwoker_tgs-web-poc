import React, { useState, useEffect } from "react";
import styled from "styled-components";

import config from "../../../../../../config/config";
import i18next from "i18next";
import i18n from "../../../../../../utils/i18n";

const NewAppBar = styled.div`
  height: 90px;
  background: ${({ theme }) => theme.appbar};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  color: ${({ theme }) => theme.primary};
  font-size: 25px;
`;
const LogoHolder = styled.img`
  background: url("${({ img }) => img}") no-repeat left center;
  background-size: contain;
  object-fit: contain;
  width: 200px;
  height: 100px;
`;
const OnlineDisplayerText = styled.div`
  display: flex;
  align-items: center;
`;
const ServerStatusContainer = styled.div``;
const ServerStatus = styled.div`
  display: flex;
  align-items: center;
`;
const IconStatus = styled.i`
  background: url(${process.env
      .PUBLIC_URL}/assets/images/wapp/home/T15/server-status.png)
    no-repeat;
  background-size: contain;
  width: 32px;
  height: 32px;
  margin-left: 10px;
`;
const OnlineUserText = styled.span``;
const BackgroundMusic = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;
const MusicPlayBtn = styled.div`
  background: url(${process.env
      .PUBLIC_URL}/assets/images/wapp/home/T15/play.png)
    no-repeat;
  background-size: contain;
  width: 35px;
  height: 35px;
`;
const MusicPauseBtn = styled.div`
  background: url(${process.env
      .PUBLIC_URL}/assets/images/wapp/home/T15/pause.png)
    no-repeat;
  background-size: contain;
  width: 35px;
  height: 35px;
  margin-left: 20px;
`;
const TopAppBar = (props) => {
  function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [totalPlayer, setTotalPlayer] = useState(
    sessionStorage.getItem("userOnlineCount") ?? null
  );
  const [isPlayingMusic, setIsPlayingMusic] = useState(
    sessionStorage.getItem("isPlayingMusic") ?? true
  );

  useEffect(() => {
    document.getElementById("audio-player").play();
  }, []);
  useEffect(() => {
    if (totalPlayer === null) {
      setTimeout(() => {
        var userRange = randomNumberGenerator(
          config.features.Home_OnlineUsers.min,
          config.features.Home_OnlineUsers.max
        );
        sessionStorage.setItem("userOnlineCount", userRange);
        setTotalPlayer(userRange);
      }, 1000);
    }

    const interval = setInterval(() => {
      var userRange = randomNumberGenerator(
        config.features.Home_OnlineUsers.min,
        config.features.Home_OnlineUsers.max
      );
      setTotalPlayer(userRange);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <NewAppBar>
      <LogoHolder src={props.brand} alt="logo" />
      <OnlineDisplayerText>
        <OnlineUserText>
          {i18next.t("common.playeronline")}: {totalPlayer}
        </OnlineUserText>
        <BackgroundMusic>
          <MusicPlayBtn
            onClick={() => document.getElementById("audio-player").play()}
          ></MusicPlayBtn>
          <MusicPauseBtn
            onClick={() => document.getElementById("audio-player").pause()}
          ></MusicPauseBtn>
          <audio id="audio-player" loop autoplay>
            <source
              src="/assets/images/wapp/home/T15/bg.mp3"
              type="audio/mp3"
            />
          </audio>
        </BackgroundMusic>
      </OnlineDisplayerText>
      {/* <ServerStatusContainer>
        <ServerStatus>
          <span>{i18n.t("t15.serverStatus")}:</span>
          <IconStatus></IconStatus>
        </ServerStatus>
      </ServerStatusContainer> */}
    </NewAppBar>
  );
};

export default TopAppBar;
