import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/__/proxy/get-all', controller.management.getAll);
  router.all('/**', controller.proxy.proxy);
};
