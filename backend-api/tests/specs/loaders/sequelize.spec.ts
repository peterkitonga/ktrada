import SequelizeConnect from '@src/loaders/sequelize';

describe('src/loaders/sequelize.ts: class SequelizeConnect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('connectDatabase()', () => {
    const authenticateMock = jest.fn();

    it('should establish connection to the database', async () => {
      authenticateMock.mockResolvedValue(null);
      SequelizeConnect.sequelize.authenticate = authenticateMock;

      await SequelizeConnect.connectDatabase();

      expect(authenticateMock).toHaveBeenCalled();
    });

    it('should handle database connection errors', async () => {
      authenticateMock.mockRejectedValue(new Error('CONNECTION ERROR'));
      SequelizeConnect.sequelize.authenticate = authenticateMock;

      try {
        await SequelizeConnect.connectDatabase();
      } catch (err) {
        const error = err as Error;

        expect(error.message).toBe('CONNECTION ERROR');
      }

      expect(authenticateMock).toHaveBeenCalled();
    });
  });

  describe('disconnetDatabase()', () => {
    const closeMock = jest.fn();

    it('should disconnect the database', async () => {
      closeMock.mockResolvedValue(null);
      SequelizeConnect.sequelize.close = closeMock;

      await SequelizeConnect.disconnetDatabase();

      expect(closeMock).toHaveBeenCalled();
    });

    it('should handle database connection errors', async () => {
      closeMock.mockRejectedValue(new Error('DISCONNECTION ERROR'));
      SequelizeConnect.sequelize.close = closeMock;

      try {
        await SequelizeConnect.disconnetDatabase();
      } catch (err) {
        const error = err as Error;

        expect(error.message).toBe('DISCONNECTION ERROR');
      }

      expect(closeMock).toHaveBeenCalled();
    });
  });
});
