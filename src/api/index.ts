import { get } from './http';

export function getInfo() {
  return get({
    url: 'get/commonInfo',
    params: {
      token: '1111',
    },
  });
}
