import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const URLENCODE_CONTENT_TYPE = 'application/x-www-form-urlencoded';

export type Response<T = any> = {
  errcode: number;
  msg: string;
  data: T;
};

export function normalizeUrl(config: AxiosRequestConfig) {
  if (config.url?.slice(0, 1) !== '/') {
    config.url = '/' + config.url;
  }
  return config;
}

export function normalizeData(config: AxiosRequestConfig) {
  if (
    config.data &&
    Object.keys(config.data).length > 0 &&
    config.headers?.['Content-Type'] === URLENCODE_CONTENT_TYPE
  ) {
    config.data = qs.stringify(config.data);
  }
  return config;
}
