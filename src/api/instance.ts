import { authLocalStorage } from "@/utils/auth/authLocalStorage";
import { isExpiredToken } from "@/store/auth/isExpiredToken";
import { AuthResponse } from "@/models/Auth";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getFingerprint } from "@/utils/auth/getFingerprint";

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

  if (!isExpiredToken(refreshToken)) {
    // TODO переделать на instance
    refreshTokenPromise = axios.post(
      "https://internship-front.framework.team/auth/refresh",
      {
        refreshToken,
        fingerprint,
      }
    );

    await refreshTokenPromise;

    refreshTokenPromise = null;
    return Promise.resolve();
  }

  authLocalStorage.remove();

  return Promise.reject();
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  const { accessToken, refreshToken } = authLocalStorage.get();

  if (isExpiredToken(accessToken) && !isExpiredToken(refreshToken)) {
    await onRefreshToken();
  }

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
};

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

instance.interceptors.request.use(onRequest);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
