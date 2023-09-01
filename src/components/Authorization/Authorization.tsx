import { FC } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@hooks/useTheme";
import Modal from "@components/Modal/Modal";
import loginBg from "@assets/login.jpg";
import { ReactComponent as Close } from "@assets/icons/close.svg";
import classNames from "classnames/bind";
import { MyLink } from "@ui/MyLink";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";

import { IAuthInputs } from "@models/IAuthInputs";
import styles from "./Authorization.module.scss";

const cx = classNames.bind(styles);

interface AuthorizationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Required field"),
  password: yup
    .string()
    .min(8, "The password must contain at least 8 characters")
    .required("Required field"),
});

const Authorization: FC<AuthorizationProps> = ({ isOpen, setIsOpen }) => {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const onSubmitHandler = () => {};

  return (
    <Modal isOpen={isOpen}>
      <div
        className={cx(
          styles.authorization,
          isOpen && styles["authorization-open"]
        )}
      >
        <div className={styles.authorization__image}>
          <img src={loginBg} alt="authorization" />
        </div>
        <div className={styles.authorization__info}>
          <div
            aria-hidden
            onClick={() => setIsOpen(false)}
            className={cx(
              styles.authorization__close,
              styles[`authorization__close-${theme}`],
              isOpen && styles["authorization__close-open"]
            )}
          >
            <Close />
          </div>
          <h3 className={styles.authorization__title}>Welcome back</h3>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className={styles.authorization__form}
          >
            <div className={styles.authorization__inputs}>
              <Input
                {...register("email")}
                type="text"
                label="email"
                htmlFor="email"
                error={errors.email ? errors.email.message : ""}
              />
              <Input
                {...register("password")}
                type="text"
                label="password"
                htmlFor="password"
                error={errors.password ? errors.password.message : ""}
              />
            </div>
            <Button type="submit" theme={theme}>
              Log In
            </Button>
          </form>
          <div className={styles.authorization__description}>
            <p className={cx(styles.authorization__text, "small", "lh")}>
              If you already have an account, please
            </p>
            <MyLink to="">sign up</MyLink>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Authorization;
