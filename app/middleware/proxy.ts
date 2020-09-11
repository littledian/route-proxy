import { Context } from 'egg';
import c2k from 'koa-connect';
import { createProxyMiddleware } from 'http-proxy-middleware';

// 这里是你自定义的中间件
export default function proxyMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { service } = ctx;
    const list = await service.proxyServer.getList();
    const item = list.find((proxy) => {
      return ctx.path.startsWith(proxy.urlPattern);
    });
    if (!item) {
      await next();
      return;
    }
    await c2k(
      createProxyMiddleware({
        target: item.proxyServer,
        changeOrigin: true
      }) as any
    )(ctx as any, next);
  };
}
