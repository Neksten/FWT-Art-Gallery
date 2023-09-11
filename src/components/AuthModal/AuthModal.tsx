import { Dispatch, FC, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTheme } from "@/context/ThemeContext";
import Modal from "@/components/Modal/Modal";
import { Input } from "@/ui/Input";
import { MyLink } from "@/ui/MyLink";
import { Button } from "@/ui/Button";
import loginBg from "@/assets/login.jpg";
import registrationBg from "@/assets/registration.jpg";
import { ReactComponent as Close } from "@/assets/icons/close.svg";
import { IAuthInputs } from "@/models/Auth";
import { useLoginMutation, useRegisterMutation } from "@/store/auth/auth.api";

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
  const [loginForm, setLoginForm] = useState(initialFormValue);
  const [signupForm, setSignupForm] = useState(initialFormValue);
  const [registerRequest] = useRegisterMutation();
  const [loginRequest] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const closeForm = () => {
    setIsOpen(false);
    reset({ username: "", password: "" });
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
      await loginRequest({ ...loginForm, fingerprint: "test" })
        .unwrap()
        .then(closeForm)
        .catch(() => {});
    } else {
      await registerRequest({ ...signupForm, fingerprint: "test" })
        .unwrap()
        .then(closeForm)
        .catch(() => {});
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div
        className={cx("authorization", `authorization-${theme}`, {
          open: isOpen,
        })}
      >
        <div className={cx("authorization__image-container")}>
          <img
            src={variant === "login" ? loginBg : registrationBg}
            alt="authorization"
            className={cx("authorization__image")}
          />
        </div>
        <div className={cx("authorization__info")}>
          <div
            aria-hidden
            onClick={closeForm}
            className={cx(
              "authorization__close",
              `authorization__close-${theme}`,
              { open: isOpen }
            )}
          >
            <Close />
          </div>
          <h3 className={cx("authorization__title")}>
            {variant === "login" ? "Welcome back" : "Create your profile"}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className={cx("authorization__form")}
          >
            <div className={cx("authorization__inputs")}>
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
          <div className={cx("authorization__description")}>
            <p className={cx("authorization__text", "small", "lh")}>
              {variant === "login"
                ? "If you don't have an account yet, please"
                : "If you already have an account, please"}
            </p>
            <MyLink className={cx("authorization__link")} to="">
              {variant === "login" ? "sign up" : "log in"}
            </MyLink>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
