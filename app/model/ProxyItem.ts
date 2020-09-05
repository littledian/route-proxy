import { Application } from 'egg';
import { BuildOptions, Model } from 'sequelize';

export interface ProxyItemAttributes extends Model {
  id: number;
  urlPattern: string;
  proxyServer: string;
  testUrl: string;
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
      testUrl: STRING(256)
    },
    {
      underscored: true,
      tableName: 'proxy_items'
    }
  );

  return class extends ProxyItem {} as ProxyItemStatic;
};
