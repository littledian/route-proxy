import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  const { management } = controller;

  router.get('/api/__/proxy', management.getAll);
  router.get('/api/__/proxy/:id', management.getById);
  router.post('/api/__/proxy', management.create);
  router.put('/api/__/proxy', management.update);
};
