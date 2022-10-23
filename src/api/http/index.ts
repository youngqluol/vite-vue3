import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import { normalizeUrl, normalizeData } from './helper';

const AXIOS_TIME_OUT = 80000;
const baseURL = 'api';

const basicConfig: AxiosRequestConfig = {
  baseURL,
  timeout: AXIOS_TIME_OUT,
  headers: {
    'Content-Type': 'application/json'
  }
};

const instance: AxiosInstance = axios.create(basicConfig);

// 请求拦截
instance.interceptors.request.use(
  config => {
    config = normalizeUrl(config);
    config = normalizeData(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 请求拦截
instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

const get = (getConfig: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    instance({ method: 'get', ...getConfig }).then(
      res => {
        resolve(res?.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

const post = (postConfig: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    instance({ method: 'post', ...postConfig }).then(
      res => {
        resolve(res?.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

export { get, post };
