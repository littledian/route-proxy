import { EggPlugin } from 'egg';
import { join } from 'path';
import { existsSync } from 'fs';
import { config } from 'dotenv';

const root = process.cwd();
if (existsSync(join(root, '.env'))) {
  config();
}

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  }
};

export default plugin;
