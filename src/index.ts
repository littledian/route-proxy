import Koa from 'koa';
import httpProxy from 'http-proxy';

const app = new Koa();
const proxy = httpProxy.createProxyServer({ secure: false });

app.use( ctx => {
  return new Promise(resolve => {
    proxy.on('close', () => {
      resolve();
    });

    proxy.web(
      ctx.req,
      ctx.res,
      { target: 'https://www.smsqsrg.cn' },
      e => {
        console.error(e);
      }
    );
  });
});

app.listen(3000);
