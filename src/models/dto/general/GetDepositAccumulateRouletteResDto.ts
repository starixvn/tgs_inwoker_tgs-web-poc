class DataDto {
  content: string = "";
  localization: string = "";
  name: string = "";
  period: {
    from: string;
    to: string;
  } = {
    from: "",
    to: "",
  };
  rouletteitems: {
    title: string;
  }[] = [];
  subsubject: string = "";
  terms: string = "";
  viplevels: number[] = [];
}

export class GetDepositAccumulateRouletteResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
