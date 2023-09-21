class Game {
  code: string = "";
  description: string = "";
  gametypes: number[] = [];
  transferwallet: boolean = true;
  name: string = "";
  status: number = 0;
}
export class GetHomePageGameListResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: Game[] = [];
  info: string | null = null;
}
