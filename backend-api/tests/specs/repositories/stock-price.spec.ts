import StockPrice from '@src/models/stock-price';
import StockPriceRepository from '@src/repositories/stock-price';

jest.mock('@src/models/stock-price');

describe('src/repositories/stock-price.ts: class StockPriceRepository', () => {
  const sampleStockPrice = {
    companyName: 'Example Inc.',
    tickerSymbol: 'EXMPL',
    currentPrice: 220.43,
    changePercent: 0.33,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    const saveMock = jest.fn();

    it('should save new stock prices', async () => {
      StockPrice.prototype.save = saveMock.mockResolvedValue(sampleStockPrice);

      await new StockPriceRepository().create(sampleStockPrice);

      expect(saveMock).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      StockPrice.prototype.save = saveMock.mockRejectedValue(new Error('SOME ERROR'));

      try {
        await new StockPriceRepository().create(sampleStockPrice);
      } catch (err) {
        const error = err as Error;

        expect(error.message).toEqual('SOME ERROR');
      }

      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    const saveMock = jest.fn();
    const findOneMock = jest.fn();

    it('should check for existing stock price with the given symbol', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue({
        save: saveMock.mockResolvedValue(sampleStockPrice),
      });

      await new StockPriceRepository().update('EXMPL', sampleStockPrice);

      expect(findOneMock).toHaveBeenCalled();
    });

    it('should update existing stock prices', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue({
        save: saveMock.mockResolvedValue(sampleStockPrice),
      });

      await new StockPriceRepository().update('EXMPL', sampleStockPrice);

      expect(saveMock).toHaveBeenCalled();
    });

    it('should return an error if a stock price with given symbol does not exist', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue(null);

      try {
        await new StockPriceRepository().update('EXMPL', sampleStockPrice);
      } catch (err) {
        const error = err as Error;

        expect(error.message).toContain('EXMPL not found.');
      }

      expect(saveMock).not.toHaveBeenCalled();
      expect(findOneMock).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue({
        save: saveMock.mockResolvedValue(sampleStockPrice),
      });
      StockPrice.prototype.save = saveMock.mockRejectedValue(new Error('SOME ERROR'));

      try {
        await new StockPriceRepository().update('EXMPL', sampleStockPrice);
      } catch (err) {
        const error = err as Error;

        expect(error.message).toEqual('SOME ERROR');
      }

      expect(saveMock).toHaveBeenCalled();
      expect(findOneMock).toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    const destroyMock = jest.fn();
    const findOneMock = jest.fn();

    it('should check for existing stock price with the given symbol', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue({
        destroy: destroyMock.mockResolvedValue(sampleStockPrice),
      });

      await new StockPriceRepository().delete('EXMPL');

      expect(findOneMock).toHaveBeenCalled();
    });

    it('should delete existing stock prices', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue({
        destroy: destroyMock.mockResolvedValue(sampleStockPrice),
      });

      await new StockPriceRepository().delete('EXMPL');

      expect(destroyMock).toHaveBeenCalled();
    });

    it('should return an error if a stock price with given symbol does not exist', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue(null);

      try {
        await new StockPriceRepository().delete('EXMPL');
      } catch (err) {
        const error = err as Error;

        expect(error.message).toContain('EXMPL not found.');
      }

      expect(destroyMock).not.toHaveBeenCalled();
      expect(findOneMock).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      StockPrice.findOne = findOneMock.mockResolvedValue({
        destroy: destroyMock.mockResolvedValue(sampleStockPrice),
      });
      StockPrice.prototype.save = destroyMock.mockRejectedValue(new Error('SOME ERROR'));

      try {
        await new StockPriceRepository().delete('EXMPL');
      } catch (err) {
        const error = err as Error;

        expect(error.message).toEqual('SOME ERROR');
      }

      expect(destroyMock).toHaveBeenCalled();
      expect(findOneMock).toHaveBeenCalled();
    });
  });

  describe('getAll()', () => {
    const findAndCountAllMock = jest.fn();

    it('should get all stock prices', async () => {
      StockPrice.findAndCountAll = findAndCountAllMock.mockResolvedValue({ rows: [sampleStockPrice], count: 1 });

      await new StockPriceRepository().getAll({ page: '1', pageSize: '5' });

      expect(findAndCountAllMock).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      StockPrice.findAndCountAll = findAndCountAllMock.mockRejectedValue(new Error('SOME ERROR'));

      try {
        await new StockPriceRepository().getAll({ page: '1', pageSize: '5' });
      } catch (err) {
        const error = err as Error;

        expect(error.message).toEqual('SOME ERROR');
      }

      expect(findAndCountAllMock).toHaveBeenCalled();
    });
  });
});
