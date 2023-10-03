import { GameTypeEnum } from "../api-services/utils/Enum";

const getDisplayGameType = (brand: string = "default"): number[] => {
  switch (brand) {
    default:
      return [
        GameTypeEnum.LOBBYALL, // Lobby 即顯示全部 0
        GameTypeEnum.SPORTS, // Sports and Horses // 1
        GameTypeEnum.ESPORTS, //4
        GameTypeEnum.LIVELOBBY, // Live Casino 6
        GameTypeEnum.QIPAILOBBY, // Card Games 8
        GameTypeEnum.FISH, //9
        GameTypeEnum.LOTTERYLOBBY,//14
        GameTypeEnum.SLOT, //15
        GameTypeEnum.TABLEGAME, // Egames 16
        GameTypeEnum.COCKFIGHT, // Sabong 17
      ];
  }
};

export default getDisplayGameType;