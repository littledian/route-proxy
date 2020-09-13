// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportConstance from '../../../app/service/Constance';
import ExportProxyServer from '../../../app/service/ProxyServer';
import ExportResponse from '../../../app/service/Response';

declare module 'egg' {
  interface IService {
    constance: AutoInstanceType<typeof ExportConstance>;
    proxyServer: AutoInstanceType<typeof ExportProxyServer>;
    response: AutoInstanceType<typeof ExportResponse>;
  }
}
