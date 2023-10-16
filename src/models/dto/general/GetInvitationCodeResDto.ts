class DataDto {
  agentId: string = "";
  invitationCode: string = "";
  userName: string = "";
}

export class GetInvitationCodeResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
