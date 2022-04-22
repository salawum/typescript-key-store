import { Query } from 'express-serve-static-core';

export type TypedRequest<T extends Query, U> = {
    body: U;
    query: T;
} & Express.Request;
