interface GetGameUrlResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    url: string;
  };
  info: string | null;
}
