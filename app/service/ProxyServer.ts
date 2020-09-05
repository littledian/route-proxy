import { Service } from 'egg';
import { ProxyItemAttributes } from '@/model/ProxyItem';
import { WithOutTimeStamp } from '@/typings';

export default class ProxyServer extends Service {
  private REDIS_LIST_KEY = 'proxy_list';

  async getProxyList(): Promise<ProxyItemAttributes[]> {
    const { app } = this;
    return JSON.parse((await app.redis.get(this.REDIS_LIST_KEY)) || '[]');
  }
  async addProxyItem(item: WithOutTimeStamp<ProxyItemAttributes>): Promise<void> {
    const {
      ctx: {
        model: { ProxyItem }
      },
      app
    } = this;
    await ProxyItem.create(item);
    const list = await ProxyItem.findAll({ raw: true });
    await app.redis.set(this.REDIS_LIST_KEY, JSON.stringify(list));
  }
  async removeProxyItem(item: ProxyItemAttributes | string | number): Promise<void> {
    const {
      ctx: {
        model: { ProxyItem }
      },
      app
    } = this;
    const list = await this.getProxyList();
    let index = -1;
    if (typeof item === 'string') {
      await ProxyItem.destroy({
        where: {
          urlPattern: item
        }
      });
      index = list.findIndex((proxy) => proxy.urlPattern === item);
    } else {
      const id = typeof item === 'number' ? item : item.id;
      await ProxyItem.destroy({
        where: {
          id
        }
      });
      index = list.findIndex((proxy) => proxy.id === id);
    }
    list.splice(index, 1);
    await app.redis.set(this.REDIS_LIST_KEY, JSON.stringify(list));
  }
}
