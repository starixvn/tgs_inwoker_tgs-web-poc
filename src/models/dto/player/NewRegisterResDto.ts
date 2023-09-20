export class NewRegisterResDto {
  IsSuccess: boolean = true;
  code: number = 0;
  data: {
    isCompleted: boolean;
    nextStepType: string;
    stepResponse: string;
  };
  info: string | null = null;
}
