export type Response<T> = {
  code: number;
  result: T;
  msg: string;
};
