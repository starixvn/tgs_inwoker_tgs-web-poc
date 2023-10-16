class Banner {
  desktopurl: string = "";
  id: string = "";
  mobileurl: string = "";
  navurl: string = "";
  alt: string = "";
  title: string = "";
}

export class GetBannerResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: Banner[] = [];
}
