class Banner {
  desktopurl: string = "";
  id: string = "";
  mobileurl: string = "";
  navurl: string = "";
  alt: string = "";
  title: string = "";
}

export class GetInvitationCodeResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: {
    agentId: string;
    invitationCode: string;
    userName: string;
  };
}
