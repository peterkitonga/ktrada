import express from 'express';
import request from 'supertest';

import ExpressApp from '@src/loaders/express';
import WinstonLogger from '@src/loaders/winston';
import SequelizeConnect from '@src/loaders/sequelize';
import configs from '@src/configs';

describe('src/loaders/express: class ExpressApp', () => {
  beforeEach(() => {
    WinstonLogger.info = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();

    // Resets the app instance
    ExpressApp.app = express();
  });

  describe('init()', () => {
    it('should load the body parser middleware', async () => {
      ExpressApp.init();

      const { headers } = await request(ExpressApp.app).get('/');

      expect(headers['content-type']).toContain('application/json');
    });

    it('should load the cors middleware', async () => {
      ExpressApp.init();

      const { headers } = await request(ExpressApp.app).get('/');

      expect(headers['access-control-allow-credentials']).toEqual('true');
    });

    it('should load the helmet middleware', async () => {
      ExpressApp.init();

      const { headers } = await request(ExpressApp.app).get('/');

      expect(headers['x-xss-protection']).toEqual('0');
    });

    it('should load the non existing route middleware', async () => {
      ExpressApp.init();

      const { statusCode } = await request(ExpressApp.app).get('/non-existing');

      expect(statusCode).toEqual(404);
    });
  });

  describe('listen()', () => {
    it('should spin up a server on configured port', async () => {
      const portValue = 8000;
      const listenMock = jest.fn();

      configs.app.port = portValue;

      ExpressApp.app.listen = listenMock;
      ExpressApp.listen();

      expect(listenMock).toHaveBeenCalledWith(portValue);
    });
  });

  describe('gracefulShutdown()', () => {
    it('should shutdown a HTTP server', async () => {
      const server = express().listen(8000);
      const closeMock = jest.spyOn(server, 'close');

      ExpressApp.gracefulShutdown(server);

      expect(closeMock).toHaveBeenCalled();
    });
  });

  describe('connectDatabase()', () => {
    it('should load connection to database', async () => {
      const databaseConnectMock = jest.fn().mockResolvedValue({ message: 'CONNECTED' });

      SequelizeConnect.connectDatabase = databaseConnectMock;

      await ExpressApp.connectDatabase();

      expect(databaseConnectMock).toHaveBeenCalled();
    });

    it('should log any connection errors', async () => {
      const databaseConnectMock = jest.fn().mockRejectedValue(new Error('CONNECTION ERROR'));
      const loggerErrorMock = jest.fn();

      SequelizeConnect.connectDatabase = databaseConnectMock;
      WinstonLogger.error = loggerErrorMock;

      try {
        await ExpressApp.connectDatabase();
      } catch (err) {
        const error = err as Error;

        expect(error.message).toBe('CONNECTION ERROR');
      }

      expect(loggerErrorMock).toHaveBeenCalledWith('CONNECTION ERROR');
    });
  });
});
