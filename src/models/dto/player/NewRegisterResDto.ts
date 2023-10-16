class DataDto {
  isCompleted: boolean = false;
  nextStepType: string = "";
  stepResponse: string = "";
}

export class NewRegisterResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
