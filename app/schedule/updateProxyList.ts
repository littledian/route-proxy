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
      service: { proxyServer }
    } = ctx;
    const list = await proxyServer.getProxyList();
    await Promise.all(
      list.map((item) => {
        return new Promise((resolve) => {
          ctx
            .curl(item.testUrl)
            .then(resolve)
            .catch(() => {
              proxyServer.removeProxyItem(item).then(resolve);
            });
        });
      })
    );
  }
}
