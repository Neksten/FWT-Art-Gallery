import React, { FC, PropsWithChildren, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import jwt_decode from "jwt-decode";

import { Toast } from "@/ui/Toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRefreshMutation } from "@/store/auth/auth.api";
import { setIsAuth } from "@/store/auth/authSlice";
import { authLocalStorage } from "@/helpers/authLocalStorage";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [refreshRequest] = useRefreshMutation();
  const { error, isLoading } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (error && !isLoading) {
      toast.custom(<Toast>{error}</Toast>, {
        duration: 4000,
        position: "bottom-right",
      });
    }
  }, [error, isLoading]);
  useEffect(() => {
    try {
      const { accessToken, refreshToken } = authLocalStorage.get();
      const decodedToken: { exp: number; iat: number; username: string } =
        jwt_decode(accessToken || "");
      const currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        // Token expired.
        (async () => {
          const response = await refreshRequest({
            fingerprint: "test",
            refreshToken: refreshToken || "",
          }).unwrap();
          authLocalStorage.set(response);
        })();
      } else {
        // Valid token
        dispatch(setIsAuth(true));
      }
    } catch (e) {
      // token null
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default AuthProvider;
