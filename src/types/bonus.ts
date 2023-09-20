export interface BonusState {
  pending: boolean;
  new: any[];

  joinPromoResult: null | any;
  token: string | null;
  error: any | null;
}
