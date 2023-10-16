class DataDto {
  content: string = "";
  haveRead: boolean = true;
  id: string = "";
  quotation: string = "";
  receiver: string = "";
  replied: boolean = true;
  sender: string = "";
  sentOn: string = "";
  subject: string = "";
}
export class GetMemoV2ResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
