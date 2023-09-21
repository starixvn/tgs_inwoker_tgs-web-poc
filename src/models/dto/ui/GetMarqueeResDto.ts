class Marquee {
  subject: string = "";
  content: string = "";
  from: number = 0;
  to: number = 0;
  localization: string = "";
  type: string = "";
}

class DataDto {
  deposits: Marquee[] = [];
  mains: Marquee[] = [];
  marquees: Marquee[] = [];
}

export class GetMarqueeResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
