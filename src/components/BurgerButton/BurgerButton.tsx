import { ButtonHTMLAttributes, FC, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { HeaderModal } from "@/components/Header/HeaderModal";
import { ReactComponent as Burger } from "@/assets/icons/burger.svg";

interface HeaderModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClickLogout: () => void;
}

const BurgerButton: FC<HeaderModalProps> = ({
  handleClickLogout,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        {...props}
        type="button"
        className={className}
      >
        <Burger />
      </button>
      {!isDesktop && isOpen && (
        <HeaderModal
          handleClickLogout={handleClickLogout}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default BurgerButton;
