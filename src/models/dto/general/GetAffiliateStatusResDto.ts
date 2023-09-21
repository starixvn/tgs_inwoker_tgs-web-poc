class DataDto {
  switchon: boolean = false;
}

export class GetAffiliateStatusResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
