import { ApiService } from "@/api-services/services/ApiService";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { GameService as PrevGameService } from "@/api-services/services/GameService";

export const GameService = {
  ...PrevGameService,
  JoinGame,
};

const languageFromLocalStorage = localStorage.getItem("i18nextLng");

const detectLanguage =
  languageFromLocalStorage || i18n.language || config.defaultLanguage;

function JoinGame(gid: number, gpcode: string) {
  return ApiService.post(`Game/geturl`, {
    gpcode: gpcode,
    gid: parseInt(gid),
    language: detectLanguage,
    extends: {
      lobbyurl: window.location.protocol + "//" + window.location.hostname,
    },
  }) as unknown as Promise<GetGameUrlResDto>;
}
