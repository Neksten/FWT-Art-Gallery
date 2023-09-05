import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@hooks/useTheme";
import Modal from "@components/Modal/Modal";
import loginBg from "@assets/login.jpg";
import registrationBg from "@assets/registration.jpg";
import { ReactComponent as Close } from "@assets/icons/close.svg";
import classNames from "classnames/bind";
import { MyLink } from "@ui/MyLink";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { IAuthInputs } from "@models/Auth";
import { useRegisterMutation } from "@store/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setIsAuth } from "@store/auth/authSlice";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface AuthorizationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
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

const initialFormValue: IAuthInputs = {
  username: "",
  password: "",
};

const AuthModal: FC<AuthorizationProps> = ({
  isOpen,
  setIsOpen,
  variant = "login",
}) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [loginForm, setLoginForm] = useState(initialFormValue);
  const [signupForm, setSignupForm] = useState(initialFormValue);
  const [registerRequest, { isError }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const handleClickClose = () => {
    setIsOpen(false);
    if (variant === "login") {
      setLoginForm(initialFormValue);
    } else {
      setSignupForm(initialFormValue);
    }
  };
  const handleChangeState = (
    setForm: Dispatch<SetStateAction<IAuthInputs>>,
    name: string,
    value: string
  ) => {
    setForm((prev: IAuthInputs) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async () => {
    if (variant === "login") {
      console.table(loginForm);
    } else {
      await registerRequest({
        ...signupForm,
        fingerprint: "test",
      }).unwrap();
      if (!isError) {
        dispatch(setIsAuth(true));
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);
  return (
    <Modal isOpen={isOpen}>
      <div
        className={cx(
          styles.authorization,
          styles[`authorization-${theme}`],
          isOpen && styles["authorization-open"]
        )}
      >
        <div className={styles.authorization__image}>
          <img
            src={variant === "login" ? loginBg : registrationBg}
            alt="authorization"
          />
        </div>
        <div className={styles.authorization__info}>
          <div
            aria-hidden
            onClick={handleClickClose}
            className={cx(
              styles.authorization__close,
              styles[`authorization__close-${theme}`],
              isOpen && styles["authorization__close-open"]
            )}
          >
            <Close />
          </div>
          <h3 className={styles.authorization__title}>
            {variant === "login" ? "Welcome back" : "Create your profile"}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className={styles.authorization__form}
          >
            <div className={styles.authorization__inputs}>
              <Input
                {...register("username")}
                type="text"
                label="email"
                htmlFor="email"
                theme={theme}
                error={errors.username ? errors.username.message : ""}
                value={
                  variant === "login" ? loginForm.username : signupForm.username
                }
                setValue={
                  variant === "login"
                    ? (value) =>
                        handleChangeState(setLoginForm, "username", value)
                    : (value) =>
                        handleChangeState(setSignupForm, "username", value)
                }
              />
              <Input
                {...register("password")}
                type="text"
                label="password"
                htmlFor="password"
                theme={theme}
                error={errors.password ? errors.password.message : ""}
                value={
                  variant === "login" ? loginForm.password : signupForm.password
                }
                setValue={
                  variant === "login"
                    ? (value) =>
                        handleChangeState(setLoginForm, "password", value)
                    : (value) =>
                        handleChangeState(setSignupForm, "password", value)
                }
              />
            </div>
            <Button type="submit" theme={theme}>
              Log In
            </Button>
          </form>
          <div className={styles.authorization__description}>
            <p className={cx(styles.authorization__text, "small", "lh")}>
              {variant === "login"
                ? "If you don't have an account yet, please"
                : "If you already have an account, please"}
            </p>
            <MyLink to="">{variant === "login" ? "sign up" : "log in"}</MyLink>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
