interface JoinedPromotionsResponse {
  joinedOn: string;
  promotionName: string | null;
}

interface JoinedPromotionsResponsePagingResponse {
  items: (JoinedPromotionsResponse | null)[];
  totalCount: number;
}

export interface GetJoinedPromoReportResDto {
  IsSuccess: boolean;
  code: number;
  data: JoinedPromotionsResponsePagingResponse;
  info: string | null;
}
