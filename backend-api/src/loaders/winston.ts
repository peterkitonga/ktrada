import { createLogger, format, Logger, transports } from 'winston';

import configs from '@src/configs';
import { storagePath } from '@src/utils/path';

class WinstonLogger {
  public logger: Logger;

  public constructor() {
    this.logger = createLogger({
      level: configs.logging.level,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      transports: [new transports.File({ filename: storagePath('logs/error.log'), level: 'error' })],
    });
    this.extendTransports();
  }

  /**
   * Configures the location & formating of logs.
   *
   * @return {void}
   */
  public extendTransports(): void {
    if (configs.app.env !== 'production') {
      this.logger.add(new transports.Console({ format: format.combine(format.colorize(), format.simple()) }));
    } else {
      this.logger.add(new transports.File({ filename: storagePath('logs/combined.log') }));
    }
  }

  /**
   * Logs an info message.
   *
   * @param {string} message Message string to be logged.
   * @return {void}
   */
  public info(message: string): void {
    this.logger.info(message);
  }

  /**
   * Logs an error message.
   *
   * @param {string} message Message string to be logged.
   * @return {void}
   */
  public error(message: string): void {
    this.logger.error(message);
  }
}

export default new WinstonLogger();
