export class BrandAllAgent {
  activenumber: number = 0;
  allagentgametype: number = 0;
  rank: number = 0;
  rebatepercentage: number = 0;
  turnover: number = 0;
}

export class GetBrandAllAgentResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: BrandAllAgent[] = [];
  info: string | null = null;
}
