export interface StockPrice {
  id?: number;
  companyName: string;
  tickerSymbol: string;
  currentPrice: number;
  changePercent: number;
  createdAt?: string;
  updatedAt?: string;
}
