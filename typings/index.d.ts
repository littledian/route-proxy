import 'egg';
import { ProxyItemAttributes } from '@/model/ProxyItem';

declare module 'egg' {
  interface Application {
    proxyItems: ProxyItemAttributes[];
  }
}

export type WithOutTimeStamp<T> = Omit<T, 'createdAt' | 'updatedAt'>;
export type WithOutId<T> = Omit<T, 'id'>;
export type WithOutTimeStampAndId<T> = WithOutId<WithOutTimeStamp<T>>;
