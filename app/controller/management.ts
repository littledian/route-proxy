import { Controller } from 'egg';

export default class ManagementController extends Controller {
  async getAll() {
    const { ctx } = this;
    const {
      service: { proxyServer, response }
    } = ctx;
    ctx.body = response.responseSuccess(await proxyServer.getProxyList());
  }
}
