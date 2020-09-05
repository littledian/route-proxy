import 'egg';

declare module 'egg' {}

export type WithOutTimeStamp<T> = Exclude<T, 'createdAt' | 'updatedAt'>;
export type WithOutId<T> = Exclude<T, 'id'>;
export type WithOutTimeStampAndId<T> = WithOutId<WithOutTimeStamp<T>>;
