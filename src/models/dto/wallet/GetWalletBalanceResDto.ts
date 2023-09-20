export class GetWalletBalanceResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    main: number;
  };
}
