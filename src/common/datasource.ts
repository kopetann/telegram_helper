import { DataSource, DataSourceOptions } from 'typeorm';
import { Config } from './config';

const conf = new Config();
export const dataSource = new DataSource(
  <DataSourceOptions>conf.getTypeOrmConfig(),
);
