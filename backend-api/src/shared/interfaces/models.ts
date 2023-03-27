export interface StockPriceModel {
  id?: number;
  companyName: string;
  tickerSymbol: string;
  currentPrice: number;
  changePercent: number;
  createdAt?: Date;
  updatedAt?: Date;
}
