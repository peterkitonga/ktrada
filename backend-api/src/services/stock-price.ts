import { Service, Inject } from 'typedi';
import fetch from 'node-fetch';

import configs from '@src/configs';
import StockPriceRepository from '@src/repositories/stock-price';
import { Paginate, PaginatedResponse, QuoteResponse, StockPriceModel } from '@src/shared/interfaces';

@Service()
export default class StockPriceService {
  @Inject()
  public stockPriceRepository: StockPriceRepository;

  public async createStockPrice(tickerSymbol: string): Promise<void> {
    try {
      const response = await fetch(`${configs.app.yahooFinanceBaseUrl}/v7/finance/quote?symbols=${tickerSymbol}`);
      const { quoteResponse } = (await response.json()) as { quoteResponse: QuoteResponse };
      const quote = quoteResponse.result[0];

      await this.stockPriceRepository.create({
        companyName: quote.shortName,
        tickerSymbol: quote.symbol,
        currentPrice: quote.regularMarketPrice,
        changePercent: quote.regularMarketChangePercent,
      });
    } catch (err) {
      throw err;
    }
  }

  public async updateStockPrices(tickerSymbols: string[]): Promise<void> {
    try {
      const response = await fetch(
        `${configs.app.yahooFinanceBaseUrl}/v7/finance/quote?symbols=${tickerSymbols.toString()}`,
      );
      const { quoteResponse } = (await response.json()) as { quoteResponse: QuoteResponse };

      for (const quote of quoteResponse.result) {
        await this.stockPriceRepository.update(quote.symbol, {
          companyName: quote.shortName,
          tickerSymbol: quote.symbol,
          currentPrice: quote.regularMarketPrice,
          changePercent: quote.regularMarketChangePercent,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  public async deleteStockPrice(tickerSymbol: string): Promise<void> {
    try {
      await this.stockPriceRepository.delete(tickerSymbol);
    } catch (err) {
      throw err;
    }
  }

  public async getStockPrices(params: Paginate): Promise<PaginatedResponse<StockPriceModel>> {
    try {
      const { results, total } = await this.stockPriceRepository.getAll(params);

      return {
        total,
        data: results,
        pageSize: Number(params.pageSize),
        page: Number(params.page),
      };
    } catch (err) {
      throw err;
    }
  }
}
