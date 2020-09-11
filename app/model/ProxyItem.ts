import { Application } from 'egg';
import { BuildOptions, Model } from 'sequelize';

export enum ProxyStatus {
  running = 1,
  stopped = 2
}

export interface ProxyItemAttributes {
  id: number;
  urlPattern: string;
  proxyServer: string;
  testUrl: string;
  status: ProxyStatus;
  createdAt: Date;
  updatedAt: Date;
}

type ProxyItemStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => ProxyItemAttributes);

export default (app: Application): ProxyItemStatic => {
  const { STRING, INTEGER } = app.Sequelize;
  const ProxyItem = app.model.define(
    'proxyItem',
    {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      urlPattern: {
        type: STRING(256),
        unique: true
      },
      proxyServer: STRING(256),
      testUrl: STRING(256),
      status: INTEGER
    },
    {
      underscored: true,
      tableName: 'proxy_items'
    }
  );

  return class extends ProxyItem {} as ProxyItemStatic;
};
