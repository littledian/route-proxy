import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {};

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599268176122_7234';

  // add your egg config in here
  config.middleware = ['proxy'];

  config.sequelize = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };

  config.redis = {
    client: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      db: Number(process.env.REDIS_DB)
    }
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  config.proxy = true;

  // add your special config in here
  const bizConfig = {};

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
