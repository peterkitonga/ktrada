import { Optional } from 'sequelize';
import { Table, Model, CreatedAt, UpdatedAt, Column, DataType } from 'sequelize-typescript';

import { StockPriceModel } from '@src/shared/interfaces';

type StockPriceCreationAttributes = Optional<StockPriceModel, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
  modelName: 'StockPrice',
  tableName: 'stock_prices',
})
export default class StockPrice extends Model<StockPriceModel, StockPriceCreationAttributes> {
  @Column(DataType.STRING)
  companyName!: string;

  @Column(DataType.STRING)
  tickerSymbol!: string;

  @Column(DataType.FLOAT)
  currentPrice!: number;

  @Column(DataType.FLOAT)
  changePercent!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
