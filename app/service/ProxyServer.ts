import { Service } from 'egg';
import { ProxyItemAttributes } from '@/model/ProxyItem';
import { WithOutTimeStamp, WithOutTimeStampAndId } from '@/typings';

export default class ProxyServer extends Service {
  async getList(): Promise<ProxyItemAttributes[]> {
    if (!this.ctx.app.proxyItems) {
      const {
        ctx: {
          model: { ProxyItem }
        }
      } = this;
      const list = await ProxyItem.findAll({ raw: true });
      this.ctx.app.proxyItems = list as any;
    }
    return this.ctx.app.proxyItems;
  }
  async getById(id: number): Promise<ProxyItemAttributes | null> {
    const {
      ctx: {
        model: { ProxyItem }
      }
    } = this;
    return ProxyItem.findByPk(id, { raw: true }) as any;
  }
  async add(item: WithOutTimeStampAndId<ProxyItemAttributes>): Promise<void> {
    const {
      ctx: {
        model: { ProxyItem }
      }
    } = this;
    await ProxyItem.create(item);
    const list = await ProxyItem.findAll({ raw: true });
    this.app.proxyItems = list as any;
  }
  async remove(item: ProxyItemAttributes | string | number): Promise<void> {
    const {
      ctx: {
        model: { ProxyItem }
      }
    } = this;
    const list = await this.getList();
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
    this.app.proxyItems = list;
  }
  async update(item: WithOutTimeStamp<ProxyItemAttributes>): Promise<void> {
    const {
      ctx: {
        model: { ProxyItem }
      }
    } = this;

    const { id, ...rest } = item;
    await ProxyItem.update(rest, { where: { id } });
    const list = await ProxyItem.findAll({ raw: true });
    this.app.proxyItems = list as any;
  }
}
