import React, { FC, PropsWithChildren, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

import { Toast } from "@/ui/Toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authLocalStorage } from "@/utils/auth/authLocalStorage";
import { isExpiredToken } from "@/store/auth/isExpiredToken";
import { logout, setIsAuth } from "@/store/auth/authSlice";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (error && !isLoading) {
      const toastId = String(Date.now());
      toast.custom(
        <Toast closeToast={() => toast.remove(toastId)}>{error}</Toast>,
        {
          id: toastId,
          duration: 4000,
          position: "bottom-right",
        }
      );
    }
  }, [error, isLoading]);

  useEffect(() => {
    const { accessToken, refreshToken } = authLocalStorage.get();

    if (!isExpiredToken(accessToken)) {
      dispatch(setIsAuth(true));
    } else if (isExpiredToken(accessToken) && isExpiredToken(refreshToken)) {
      dispatch(logout());
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
