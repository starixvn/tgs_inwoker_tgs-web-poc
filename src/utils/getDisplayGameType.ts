import { GameTypeEnum } from "../api-services/utils/Enum";

const getDisplayGameType = (brand: string) => {
  switch (brand) {
    default:
      return [
        GameTypeEnum.SPORTS, // Sports and Horses
        GameTypeEnum.ESPORTS,
        GameTypeEnum.LIVELOBBY, // Live Casino
        GameTypeEnum.QIPAILOBBY, // Card Games
        GameTypeEnum.FISH,
        GameTypeEnum.LOTTERYLOBBY,
        GameTypeEnum.SLOT,
        GameTypeEnum.TABLEGAME, // Egames
        GameTypeEnum.COCKFIGHT, // Sabong
      ];
  }
};

export default getDisplayGameType;