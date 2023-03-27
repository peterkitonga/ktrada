export interface AppResponse<DataType> {
  message?: string;
  data?: DataType;
}

export interface Quote {
  shortName: string;
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
}

export interface QuoteResponse {
  result: Quote[];
}
