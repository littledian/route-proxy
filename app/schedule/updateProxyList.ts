import { Subscription } from 'egg';

export default class UpdateProxyList extends Subscription {
  static get schedule() {
    return {
      interval: 1000 * 60,
      type: 'all'
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;
    const {
      model: { ProxyItem }
    } = ctx;
    const list = await ProxyItem.findAll({ raw: true });
    this.app.proxyItems = list as any;
  }
}
