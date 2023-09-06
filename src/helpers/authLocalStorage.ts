import { AuthResponse } from "@models/Auth";

interface Auth {
  get: () => { accessToken: string | null; refreshToken: string | null };
  set: (data: AuthResponse) => void;
  remove: () => void;
}

export const authLocalStorage: Auth = {
  get: () => {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    return { accessToken, refreshToken };
  },
  set: (data) => {
    localStorage.setItem("access", data.accessToken);
    localStorage.setItem("refresh", data.refreshToken);
  },
  remove: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
};
