interface JoinLobbyGameResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    url: string;
  };
  info: string | null;
}
