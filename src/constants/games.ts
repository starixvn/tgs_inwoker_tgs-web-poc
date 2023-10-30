import hotIcon from "@/assets/t18/images/home/mobile/badge_hot.svg";
import newIcon from "@/assets/t18/images/home/mobile/badge_new.svg";
import game1 from "@/assets/t18/images/home/mobile/game1.png";
import game2 from "@/assets/t18/images/home/mobile/game2.png";
import game3 from "@/assets/t18/images/home/mobile/game3.png";
import game4 from "@/assets/t18/images/home/mobile/game4.png";

export const gamesList = [
  {
    key: "game1",
    iconUrl: game1,
    text: "game1",
    isFavorite: false,
    tag: "",
  },
  {
    key: "game2",
    iconUrl: game2,
    text: "game2",
    isFavorite: true,
    tag: "hot",
  },
  {
    key: "game3",
    iconUrl: game3,
    text: "game3",
    isFavorite: false,
    tag: "",
  },
  {
    key: "game4",
    iconUrl: game4,
    text: "game4",
    isFavorite: true,
    tag: "new",
  },
];

export const badgeList = {
  hot: hotIcon,
  new: newIcon,
};

export const providerStatus = {
  Active: 0,
  Inactive: 1,
  Archived: 2,
  Maintenance: 3,
};
