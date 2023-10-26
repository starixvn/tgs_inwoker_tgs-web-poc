import favorite from "@/assets/t18/images/home/mobile/favorite.svg";
import hot from "@/assets/t18/images/home/mobile/hot.svg";
import newIcon from "@/assets/t18/images/home/mobile/new.svg";
import recommend from "@/assets/t18/images/home/mobile/recommend.svg";

type TagIcon = {
  text: string;
  iconUrl: string;
};

export const gameTagList: TagIcon[] = [
  {
    text: "Favorite",
    iconUrl: favorite,
  },
  {
    text: "Hot",
    iconUrl: hot,
  },
  {
    text: "New",
    iconUrl: newIcon,
  },
  {
    text: "Recommend",
    iconUrl: recommend,
  },
];
