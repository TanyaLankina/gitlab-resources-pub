import Axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { store } from 'store/store';
import { GITLAB_API_BASE_URL } from '../constants';
import Emitter from '../events';

export const apiUrl = GITLAB_API_BASE_URL;
export const axios = Axios.create();
export const unauthorizedInstance = Axios.create();

const setAuthorization = <TConfig extends AxiosRequestConfig, TAppToken>(
  config: TConfig,
  token: TAppToken
): TConfig & { headers: TConfig['headers'] & { Authorization: string } } => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  },
});

axios.interceptors.request.use(
  async (config) => {
    const currentToken = store.getState().auth.authToken;
    return currentToken ? setAuthorization(config, currentToken) : config;
  },
  (error) => {
    Emitter.emit('apiError', {
      message: error.message,
      description: error.response?.data.error_description,
    });

    return Promise.reject();
  }
);

axios.interceptors.response.use(
  (data) => data,
  (error: AxiosError) => {
    Emitter.emit('apiError', {
      message: error.message,
      description: error.response?.data.error_description,
    });

    return Promise.reject(error);
  }
);

export const fetchApiRequest = <TResponse extends unknown>(
  method: Method,
  uri: string,
  options?: {
    unauthorized?: boolean;
    host?: string;
    payload?: AxiosRequestConfig['data'];
  }
): Promise<TResponse> => {
  const instance = options?.unauthorized ? unauthorizedInstance : axios;
  const url = `${options?.host || apiUrl}/${uri}`;

  return instance({
    method,
    url,
    data: options?.payload,
  }) as Promise<TResponse>;
};
