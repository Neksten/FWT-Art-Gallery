import { FC, PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "@hooks/redux";
import jwt_decode from "jwt-decode";
import { useRefreshMutation } from "@store/auth/auth.api";
import { setIsAuth } from "@store/auth/authSlice";
import { authLocalStorage } from "@helpers/authLocalStorage";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [refreshRequest] = useRefreshMutation();

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
  return <div>{children}</div>;
};

export default AuthProvider;
