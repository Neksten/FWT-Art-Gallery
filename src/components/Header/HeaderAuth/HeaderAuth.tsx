import { FC } from "react";

import { useAppSelector } from "@/hooks/redux";

import { HeaderButton } from "@/components/Header/HeaderButton";

interface HeaderAuthProps {
  handleClickLogout: () => void;
  className: string;
}

const HeaderAuth: FC<HeaderAuthProps> = ({ handleClickLogout, className }) => {
  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isAuth ? (
        <li>
          <button
            onClick={handleClickLogout}
            type="button"
            className={className}
          >
            Log out
          </button>
        </li>
      ) : (
        <>
          <li>
            <HeaderButton variant="login" className={className} />
          </li>
          <li>
            <HeaderButton variant="signup" className={className} />
          </li>
        </>
      )}
    </>
  );
};

export default HeaderAuth;
