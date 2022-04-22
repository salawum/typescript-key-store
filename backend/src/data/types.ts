import * as core from 'express';
import StoreData from './StoreData';

// export type Request<ReqBody = StoreData> = core.Request<ReqBody>;

// export type Request = core.Request & StoreData;

export type Request<ReqBody extends StoreData = any> = core.Request<ReqBody>;
