import { FC, PropsWithChildren, useEffect } from "react";

import { useAppDispatch } from "@/hooks/redux";
import { authLocalStorage } from "@/utils/auth/authLocalStorage";
import { isExpiredToken } from "@/store/auth/isExpiredToken";
import { logout, setIsAuth } from "@/store/auth/authSlice";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { refreshToken } = authLocalStorage.get();

    if (!isExpiredToken(refreshToken)) {
      dispatch(setIsAuth(true));
    }
    if (isExpiredToken(refreshToken)) {
      dispatch(logout());
    }
  }, [dispatch]);

  return <div>{children}</div>;
};

export default AuthProvider;
