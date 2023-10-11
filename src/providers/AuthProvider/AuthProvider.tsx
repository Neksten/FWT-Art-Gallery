import { FC, PropsWithChildren, useEffect } from "react";

import { authLocalStorage } from "@/utils/auth/authLocalStorage";
import { isExpiredToken } from "@/store/auth/isExpiredToken";
import { logout, setIsAuth } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/hooks/redux";

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
