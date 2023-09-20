export class GetPromotionRouletteStatusResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    id: string;
    itemindex: number;
  };
}
