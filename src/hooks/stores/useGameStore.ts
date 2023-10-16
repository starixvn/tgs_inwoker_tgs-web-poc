import {
  GETFAVGAME_BEGIN,
  GETFAVGAME_FAIL,
  GETFAVGAME_SUCCESS,
  GETHOMEPAGEGAMELIST_BEGIN,
  GETHOMEPAGEGAMELIST_FAIL,
  GETHOMEPAGEGAMELIST_SUCCESS,
  REMOVEFAVGAME_BEGIN,
  REMOVEFAVGAME_FAIL,
  REMOVEFAVGAME_SUCCESS,
  SETFAVGAME_BEGIN,
  SETFAVGAME_FAIL,
  SETFAVGAME_SUCCESS,
} from "@/api-services/constant/actionType";
import { GameService } from "@/api-services/services/GameService";
import { GetFavoriteGameResDto } from "@/models/dto/game/GetFavoriteGameResDto";
import { GetHomePageGameListResDto } from "@/models/dto/game/GetHomePageGameListResDto";
import { RemoveFavoriteGameResDto } from "@/models/dto/game/RemoveFavoriteGameResDto";
import { SetFavoriteGameResDto } from "@/models/dto/game/SetFavoriteGameResDto";
import { GameState } from "@/types/game";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useGameStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const game: GameState = useSelector((state) => state.game);

  const getHomePageGameList = useCallback(async () => {
    dispatch({
      type: GETHOMEPAGEGAMELIST_BEGIN,
      loading: true,
    });

    try {
      const response =
        (await GameService.GetHomePageGameList()) as unknown as GetHomePageGameListResDto;

      if (response?.IsSuccess) {
        dispatch({
          type: GETHOMEPAGEGAMELIST_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: GETHOMEPAGEGAMELIST_FAIL,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (e: any) {
      dispatch({
        type: GETHOMEPAGEGAMELIST_FAIL,
        payload: e.status,
        loading: false,
      });
    }
  }, [dispatch]);

  const setFavoriteGame = useCallback(
    async (gameId: number) => {
      dispatch({
        type: SETFAVGAME_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await GameService.SetFavoriteGame(
          gameId
        )) as SetFavoriteGameResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: SETFAVGAME_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: SETFAVGAME_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (e: any) {
        dispatch({
          type: SETFAVGAME_FAIL,
          payload: e.status,
          loading: false,
        });
      }
    },
    [dispatch]
  );

  const removeFavoriteGame = useCallback(
    async (gameId: number) => {
      dispatch({
        type: REMOVEFAVGAME_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await GameService.RemoveFavoriteGame(
          gameId
        )) as RemoveFavoriteGameResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: REMOVEFAVGAME_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: REMOVEFAVGAME_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (e: any) {
        dispatch({
          type: REMOVEFAVGAME_FAIL,
          payload: e.status,
          loading: false,
        });
      }
    },
    [dispatch]
  );

  const getFavoriteGame = useCallback(
    async (gameType) => {
      dispatch({
        type: GETFAVGAME_BEGIN,
        loading: true,
      });

      try {
        //  @ts-ignore
        const response = (await GameService.GetFavoriteGame(
          gameType
        )) as unknown as GetFavoriteGameResDto;

        if (response?.IsSuccess) {
          dispatch({
            type: GETFAVGAME_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: GETFAVGAME_FAIL,
            payload: response,
            loading: false,
          });
        }

        return response;
      } catch (e: any) {
        dispatch({
          type: GETFAVGAME_FAIL,
          payload: e.status,
          loading: false,
        });
      }
    },
    [dispatch]
  );

  return {
    game,
    getHomePageGameList,
    setFavoriteGame,
    removeFavoriteGame,
    getFavoriteGame,
  };
}
