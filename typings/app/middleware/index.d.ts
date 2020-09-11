// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProxy from '../../../app/middleware/proxy';

declare module 'egg' {
  interface IMiddleware {
    proxy: typeof ExportProxy;
  }
}
