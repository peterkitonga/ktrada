import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import configs from '@src/configs';
import StockPrice from '@src/models/stock-price';

import { AppResponse } from '@src/shared/interfaces';

class SequelizeConnect {
  public sequelize: Sequelize;

  public constructor() {
    this.sequelize = new Sequelize(configs.database.database, configs.database.username, configs.database.password, {
      dialect: configs.database.dialect as Dialect,
      host: configs.database.host,
      port: configs.database.port,
      logging: false,
      define: {
        charset: 'utf8',
        underscored: false,
        timestamps: true,
      },
      sync: { force: false },
    });
    this.sequelize.addModels([StockPrice]);
  }

  /**
   * Creates a connection to the database.
   *
   * @return {Promise<AppResponse<null>>}
   */
  public async connectDatabase(): Promise<AppResponse<null>> {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();

      return { message: 'DATABASE CONNECTED!' };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Disconnects the database.
   *
   * @return {Promise<AppResponse<null>>}
   */
  public async disconnetDatabase(): Promise<AppResponse<null>> {
    try {
      await this.sequelize.close();

      return { message: 'DATABASE DISCONNECTED!' };
    } catch (err) {
      throw err;
    }
  }
}

export default new SequelizeConnect();
