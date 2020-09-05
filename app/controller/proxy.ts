import { Controller } from 'egg';
import { createProxyServer } from 'http-proxy';
import { isMatch } from 'micromatch';

export default class ProxyController extends Controller {
  private httpProxy = createProxyServer({ secure: false });

  async proxy() {
    const { ctx } = this;
    const { service } = ctx;
    const list = await service.proxyServer.getProxyList();
    const item = list.find((proxy) => {
      return isMatch(ctx.path, proxy.urlPattern);
    });
    if (!item) {
      ctx.status = 404;
      ctx.body = 'Not Found';
      return;
    }
    return new Promise((resolve) => {
      this.httpProxy.on('close', () => {
        resolve();
      });
      this.httpProxy.web(ctx.req, ctx.res, {
        target: item.proxyServer
      });
    });
  }
}
