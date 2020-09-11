import 'egg';

declare module 'egg' {}

export type WithOutTimeStamp<T> = Omit<T, 'createdAt' | 'updatedAt'>;
export type WithOutId<T> = Omit<T, 'id'>;
export type WithOutTimeStampAndId<T> = WithOutId<WithOutTimeStamp<T>>;
