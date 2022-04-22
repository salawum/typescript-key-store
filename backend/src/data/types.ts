import * as core from 'express-serve-static-core';
import StoreData from './StoreData';

export type Request<ReqBody = StoreData> = core.Request<ReqBody>;
