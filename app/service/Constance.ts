import { Service } from 'egg';

export default class ConstanceServer extends Service {
  REDIS_LIST_KEY = 'proxy_list';
}
