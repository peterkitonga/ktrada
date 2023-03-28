export interface StockPrice {
  id?: number;
  companyName: string;
  tickerSymbol: string;
  currentPrice: number;
  changePercent: number;
  createdAt?: string;
  updatedAt?: string;
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
