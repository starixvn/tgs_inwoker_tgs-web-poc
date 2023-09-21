class Inbox {
  id: string = "";
  createon: string = "";
  subject: string = "";
  content: string = "";
  isread: boolean = false;
  localization: string = "";
}

class DataDto {
  items: Inbox[] = [];
}

export class InboxListResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
