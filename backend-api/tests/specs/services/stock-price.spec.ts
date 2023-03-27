import fetch from 'node-fetch';

import StockPriceRepository from '@src/repositories/stock-price';
import StockPriceService from '@src/services/stock-price';

const sampleQuoteResponse = {
  quoteResponse: {
    result: [
      {
        shortName: 'Example Inc.',
        symbol: 'EXMPL',
        regularMarketPrice: 205.65,
        regularMarketChangePercent: 0.21,
      },
    ],
  },
};

jest.mock('node-fetch', () =>
  jest.fn().mockReturnValue({
    json: () => {
      return Promise.resolve(sampleQuoteResponse);
    },
  }),
);

describe('src/services/stock-price.ts: class StockPriceService', () => {
  beforeEach(() => {
    StockPriceService.prototype.stockPriceRepository = new StockPriceRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createStockPrice()', () => {
    const createMock = jest.fn();

    it('should call the create method from repository class', async () => {
      StockPriceRepository.prototype.create = createMock.mockResolvedValue(true);

      await new StockPriceService().createStockPrice('EXMPL');

      expect(createMock).toHaveBeenCalled();
    });

    it('should handle errors from the create method', async () => {
      StockPriceRepository.prototype.create = createMock.mockRejectedValue(new Error('SOME ERROR!'));

      try {
        await new StockPriceService().createStockPrice('EXMPL');
      } catch (err) {
        const error = err as Error;

        expect(error.message).toEqual('SOME ERROR!');
      }

      expect(createMock).toHaveBeenCalled();
    });
  });

  describe('updateStockPrices()', () => {
    const updateMock = jest.fn();

    it('should call the update method from repository class', async () => {
      StockPriceRepository.prototype.update = updateMock.mockResolvedValue(true);

      await new StockPriceService().updateStockPrices(['EXMPL']);

      expect(updateMock).toHaveBeenCalled();
    });

    it('should handle errors from the update method', async () => {
      StockPriceRepository.prototype.update = updateMock.mockRejectedValue(new Error('SOME ERROR!'));

      try {
        await new StockPriceService().updateStockPrices(['EXMPL']);
      } catch (err) {
        const error = err as Error;

        expect(error.message).toEqual('SOME ERROR!');
      }

      expect(updateMock).toHaveBeenCalled();
    });
  });

  describe('deleteStockPrice()', () => {
    const deleteMock = jest.fn();

    it('should call the delete method from repository class', async () => {
      StockPriceRepository.prototype.delete = deleteMock.mockResolvedValue(true);

      await new StockPriceService().deleteStockPrice('EXMPL');

      expect(deleteMock).toHaveBeenCalled();
    });

    it('should handle errors from the delete method', async () => {
      StockPriceRepository.prototype.delete = deleteMock.mockRejectedValue(new Error('SOME ERROR!'));

      try {
        await new StockPriceService().deleteStockPrice('EXMPL');
      } catch (err) {
        const error = err as Error;

        expect(error.message).toEqual('SOME ERROR!');
      }

      expect(deleteMock).toHaveBeenCalled();
    });
  });
});
