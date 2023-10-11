import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { authLocalStorage } from "@/utils/auth/authLocalStorage";
import { getFingerprint } from "@/utils/auth/getFingerprint";
import { isExpiredToken } from "@/store/auth/isExpiredToken";
import { AuthResponse } from "@/models/Auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

let refreshTokenPromise: Promise<unknown> | null = null;

const onRefreshToken = async () => {
  if (refreshTokenPromise) {
    await refreshTokenPromise;
    refreshTokenPromise = null;

    return Promise.resolve();
  }

  const { refreshToken } = authLocalStorage.get();
  const fingerprint = await getFingerprint();

  if (refreshToken && !isExpiredToken(refreshToken)) {
    refreshTokenPromise = instance("/auth/refresh", {
      method: "POST",
      data: { refreshToken, fingerprint },
    });

    await refreshTokenPromise;
    refreshTokenPromise = null;

    return Promise.resolve();
  }

  authLocalStorage.remove();

  return Promise.reject();
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  if (config.url?.includes("auth") || config.url?.includes("static")) {
    return config;
  }

  let { accessToken } = authLocalStorage.get();

  if (isExpiredToken(accessToken)) {
    await onRefreshToken();
    accessToken = authLocalStorage.get().accessToken;
  }

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.config.url?.includes("auth")) {
    authLocalStorage.set(response.data as AuthResponse);
  }
  return response;
};

export const onResponseError = async (
  error: AxiosError
): Promise<AxiosError> => {
  if (error?.response?.status !== 401) {
    return Promise.reject(error);
  }

  const config = error.config as AxiosRequestConfig;

  if (config.url?.includes("static")) {
    return Promise.reject(error);
  }

  const { refreshToken } = authLocalStorage.get();

  if (refreshToken) {
    await onRefreshToken();
    const { accessToken } = authLocalStorage.get();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      return instance(config);
    }
  }

  return Promise.reject();
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
