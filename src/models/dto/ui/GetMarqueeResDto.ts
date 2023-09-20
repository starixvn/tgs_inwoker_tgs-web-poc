class Marquee {
  subject: string = "";
  content: string = "";
  from: number = 0;
  to: number = 0;
  localization: string = "";
  type: string = "";
}

export class GetMarqueeResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    deposits: Marquee[];
    mains: Marquee[];
    marquees: Marquee[];
  };
}
