import { Controller } from 'egg';

export default class ManagementController extends Controller {
  async getAll() {
    const { ctx } = this;
    const {
      service: { proxyServer, response }
    } = ctx;
    ctx.body = response.responseSuccess(await proxyServer.getList());
  }

  async getById() {
    const { ctx } = this;
    const {
      service: { proxyServer, response },
      params
    } = ctx;
    ctx.body = response.responseSuccess(await proxyServer.getById(Number(params.id)));
  }

  async create() {
    const {
      ctx,
      service: { response, proxyServer }
    } = this;

    const rule = {
      urlPattern: { type: 'string' },
      proxyServer: { type: 'string' },
      testUrl: { type: 'string' },
      status: { type: 'int' }
    };

    const { urlPattern, proxyServer: proxyServerUrl, testUrl, status } = ctx.request.body;

    try {
      ctx.validate(rule);
    } catch (e) {
      ctx.body = response.responseInvalidateParams();
      return;
    }

    ctx.body = response.responseSuccess(
      await proxyServer.add({
        urlPattern,
        proxyServer: proxyServerUrl,
        testUrl,
        status
      })
    );
  }

  async update() {
    const {
      ctx,
      service: { response, proxyServer }
    } = this;

    const rule = {
      id: { type: 'number' },
      urlPattern: { type: 'string' },
      proxyServer: { type: 'string' },
      testUrl: { type: 'string' },
      status: { type: 'number' }
    };

    const { id, urlPattern, proxyServer: proxyServerUrl, testUrl, status } = ctx.request.body;

    try {
      ctx.validate(rule);
    } catch (e) {
      ctx.body = response.responseInvalidateParams();
      return;
    }

    ctx.body = response.responseSuccess(
      await proxyServer.update({
        id,
        urlPattern,
        proxyServer: proxyServerUrl,
        testUrl,
        status
      })
    );
  }
}
