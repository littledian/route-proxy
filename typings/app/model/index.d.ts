// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProxyItem from '../../../app/model/ProxyItem';

declare module 'egg' {
  interface IModel {
    ProxyItem: ReturnType<typeof ExportProxyItem>;
  }
}
