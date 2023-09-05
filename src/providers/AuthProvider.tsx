import { FC, PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "@hooks/redux";
import { useRefreshMutation } from "@store/auth/auth.api";
import { setIsAuth } from "@store/auth/authSlice";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [refreshRequest, { isError }] = useRefreshMutation();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh");
    const data =
      refreshToken !== null
        ? refreshRequest({ refreshToken, fingerprint: "test" }).unwrap()
        : null;
    if (!isError && data) {
      dispatch(setIsAuth(true));
      // refreshRequest({ refreshToken: data, fingerprint: "test" });
    }
    // eslint-disable-next-line
  }, []);
  return <div>{children}</div>;
};

export default AuthProvider;
