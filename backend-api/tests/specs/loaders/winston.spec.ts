import winston from 'winston';

import WinstonLogger from '@src/loaders/winston';
import configs from '@src/configs';

describe('src/loaders/winston.ts: class WinstonLogger', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('extendTransports()', () => {
    const loggerAddMock = jest.spyOn(WinstonLogger.logger, 'add');

    it('should add file transport if NODE_ENV is set to "production"', () => {
      configs.app.env = 'production';

      WinstonLogger.extendTransports();

      const args = loggerAddMock.mock.calls[0][0];

      expect(loggerAddMock).toHaveBeenCalledTimes(1);
      expect(args).toBeInstanceOf(winston.transports.File);
    });

    it('should add console transport if NODE_ENV is set to "development"', () => {
      configs.app.env = 'development';

      WinstonLogger.extendTransports();

      const args = loggerAddMock.mock.calls[0][0];

      expect(loggerAddMock).toHaveBeenCalledTimes(1);
      expect(args).toBeInstanceOf(winston.transports.Console);
    });
  });

  describe('info()', () => {
    const infoMock = jest.fn();

    beforeEach(() => {
      WinstonLogger.logger.info = infoMock;
    });

    it('should expect message as a string', () => {
      const logMessage = 'SOME MESSAGE';

      WinstonLogger.info(logMessage);

      expect(infoMock).toHaveBeenCalledWith(logMessage);
    });
  });

  describe('error()', () => {
    const errorMock = jest.fn();

    beforeEach(() => {
      WinstonLogger.logger.error = errorMock;
    });

    it('should expect message as a string', () => {
      const logMessage = 'SOME MESSAGE';

      WinstonLogger.error(logMessage);

      expect(errorMock).toHaveBeenCalledWith(logMessage);
    });
  });
});
