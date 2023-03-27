export interface AppResponse<DataType> {
  message?: string;
  data?: DataType;
}

export interface PaginatedResponse<DataType> extends AppResponse<DataType[]> {
  total: number;
  pageSize: number;
  page: number;
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

export interface Security {
  exchange: string;
  shortname: string;
  quoteType: string;
  symbol: string;
  typeDisp: string;
  longname: string;
  exchDisp: string;
  sector: string;
}

export interface SecuritiesResponse {
  quotes: Security[];
}
