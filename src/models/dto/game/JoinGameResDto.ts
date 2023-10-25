interface JoinGameResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    url: string;
  };
  info: string | null;
}
