import 'reflect-metadata';

import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Server } from 'http';
import dotenvExpand from 'dotenv-expand';
import express, { Request, Response, NextFunction, Application, json } from 'express';

dotenvExpand.expand(dotenv.config({ path: path.resolve('.env') }));

import configs from '@src/configs';
import WinstonLogger from '@src/loaders/winston';
import { HttpStatusCodes } from '@src/shared/enums/http-status';
import BaseError from '@src/shared/errors/base';

class ExpressApp {
  public app: Application;

  public constructor() {
    this.app = express();
  }

  /**
   * Instantiates the application middlewares.
   *
   * @return {void}
   */
  public init(): void {
    this.setupBodyParser();

    this.setupHelmet();

    this.handleHomeRoute();
    this.handleNonExistingRoute();
    this.handleErrorMiddleware();

    this.listen();
  }

  /**
   * Creates the http server with a port.
   *
   * @return {void}
   */
  public listen(): void {
    const server = this.app.listen(configs.app.port);

    WinstonLogger.info(`Listening on: ${configs.app.base}, PID: ${process.pid}`);

    process.on('SIGTERM', () => {
      WinstonLogger.info('Starting graceful shutdown of server...');

      this.gracefulShutdown(server);
    });

    process.on('SIGINT', () => {
      WinstonLogger.info('Exiting server process cleanly...');

      this.gracefulShutdown(server);
    });
  }

  /**
   * Performs a graceful shutdown of the HTTP server.
   *
   * @param {Server} server Instance of http.Server.
   * @return {Server}
   */
  public gracefulShutdown(server: Server) {
    return server.close(() => {
      WinstonLogger.info('Server shutdown successfully!');
    });
  }

  /**
   * Creates a middleware that sets up rules
   * for cross-origin requests.
   *
   * @return {void}
   */
  public setupCors(): void {
    this.app.use(
      cors({
        origin: process.env.APP_ALLOWED_ORIGINS!.split(','),
        credentials: true,
        preflightContinue: true,
      }),
    );
  }

  /**
   * Sets up express middleware for sending secure HTTP headers
   * during requests.
   *
   * @return {void}
   */
  public setupHelmet(): void {
    this.app.use(helmet());
  }

  /**
   * Sets up express middleware for parsing request bodies as JSON.
   *
   * @return {void}
   */
  public setupBodyParser(): void {
    this.app.use(json({ limit: '2mb' }));
  }

  /**
   * Sets up the home route with a welcome message.
   *
   * @return {void}
   */
  public handleHomeRoute(): void {
    this.app.get('/', (_req: Request, res: Response) => {
      res.status(HttpStatusCodes.OK).json({
        message: `Hello There! Welcome to ${configs.app.name}!`,
        version: configs.app.api.version,
      });
    });
  }

  /**
   * Creates middleware for non existing routes.
   *
   * @return {void}
   */
  public handleNonExistingRoute(): void {
    this.app.use((req: Request, res: Response) => {
      res.status(HttpStatusCodes.NOT_FOUND).json({
        status: 'error',
        message: `${req.method} route for '${req.path}' not found`,
      });
    });
  }

  /**
   * Creates middleware for handling errors generated in the application.
   *
   * @return {void}
   */
  public handleErrorMiddleware(): void {
    this.app.use((err: BaseError, _req: Request, res: Response, next: NextFunction) => {
      const { statusCode, message, data, stack } = err;

      let genericStatusCode = HttpStatusCodes.INTERNAL_SERVER;

      WinstonLogger.error(message);
      WinstonLogger.error(stack!);

      if (statusCode) {
        genericStatusCode = statusCode;
      }

      res.status(genericStatusCode).json({ message, data });
    });
  }
}

export default new ExpressApp();
