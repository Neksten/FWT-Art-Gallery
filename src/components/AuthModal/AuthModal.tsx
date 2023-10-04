import { FC, useCallback, useEffect } from "react";
import classNames from "classnames/bind";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTheme } from "@/context/ThemeContext";
import { IAuthInputs } from "@/models/Auth";
import { useLoginMutation, useRegisterMutation } from "@/store/auth/auth.api";
import { useAppDispatch } from "@/hooks/redux";
import { setIsAuth } from "@/store/auth/authSlice";
import { getFingerprint } from "@/utils/auth/getFingerprint";
import { resetError } from "@/store/error/errorSlice";

import { Modal } from "@/components/Modal";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { InputPassword } from "@/ui/InputPassword";
import loginBg from "@/assets/login.jpg";
import registrationBg from "@/assets/registration.jpg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface AuthorizationProps {
  setIsOpen: (value: boolean) => void;
  setIsRedirect: () => void;
  variant?: "login" | "signup";
}

const validationSchema = yup.object({
  username: yup
    .string()
    .email("Enter a valid email")
    .required("Required field"),
  password: yup
    .string()
    .min(8, "The password must contain at least 8 characters")
    .required("Required field"),
});

const AuthModal: FC<AuthorizationProps> = ({
  setIsOpen,
  setIsRedirect,
  variant = "login",
}) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [registerRequest, { isSuccess: isSuccessRegister }] =
    useRegisterMutation();
  const [loginRequest, { isSuccess: isSuccessLogin }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const fulfilledRequest = useCallback(() => {
    dispatch(setIsAuth(true));
    setIsOpen(false);
    // eslint-disable-next-line
  }, [setIsOpen]);

  const onSubmitHandler = async (data: any) => {
    dispatch(resetError());
    const fingerprint = await getFingerprint();

    if (variant === "login") {
      await loginRequest({ ...data, fingerprint });
    } else {
      await registerRequest({ ...data, fingerprint });
    }
  };

  const handleClickRedirect = () => {
    setIsOpen(false);
    setIsRedirect();
  };

  useEffect(() => {
    if (isSuccessRegister || isSuccessLogin) {
      fulfilledRequest();
    }
  }, [fulfilledRequest, isSuccessRegister, isSuccessLogin]);

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      closeModal={() => setIsOpen(false)}
    >
      <div className={cx("modal__image-container")}>
        <img
          src={variant === "login" ? loginBg : registrationBg}
          alt={variant}
          className={cx("modal__image")}
        />
      </div>
      <div className={cx("modal__info")}>
        <h3 className={cx("modal__title")}>
          {variant === "login" ? "Welcome back" : "Create your profile"}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={cx("modal__form")}
        >
          <div className={cx("modal__inputs")}>
            <Input
              {...register("username")}
              label="email"
              autoComplete="username"
              theme={theme}
              error={errors?.username?.message}
            />
            <InputPassword
              register={register("password")}
              label="password"
              theme={theme}
              error={errors?.password?.message}
            />
          </div>
          <Button type="submit" theme={theme}>
            Log In
          </Button>
        </form>
        <div className={cx("modal__description")}>
          <p className={cx("modal__text", "small", "lh")}>
            {variant === "login"
              ? "If you don't have an account yet, please"
              : "If you already have an account, please"}
          </p>
          <button
            type="button"
            className={cx("modal__link")}
            onClick={handleClickRedirect}
          >
            {variant === "login" ? "sign up" : "log in"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
