class DataDto {
  beginTime: string = "";
  endTime: string = "";
  content: string = "";
}

export class GerMaintenanceResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
