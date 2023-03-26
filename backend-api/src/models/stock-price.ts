import { Optional } from 'sequelize';
import { Table, Model, CreatedAt, UpdatedAt, Column, DataType } from 'sequelize-typescript';

interface StockPriceAttributes {
  id: number;
  companyName: string;
  tickerSymbol: string;
  currentPrice: number;
  changePercent: number;
  createdAt: Date;
  updatedAt: Date;
}

type StockPriceCreationAttributes = Optional<StockPriceAttributes, 'id'>;

@Table
export default class StockPrice extends Model<StockPriceAttributes, StockPriceCreationAttributes> {
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
