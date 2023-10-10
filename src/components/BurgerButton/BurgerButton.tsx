import { ButtonHTMLAttributes, FC, useState } from "react";

import { HeaderModal } from "@/components/Header/HeaderModal";
import { ReactComponent as Burger } from "@/assets/icons/burger.svg";

interface HeaderModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClickLogout: () => void;
}

const SCREEN_WIDTH = window.screen.width < 1440;

const BurgerButton: FC<HeaderModalProps> = ({
  handleClickLogout,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      {SCREEN_WIDTH && isOpen && (
        <HeaderModal
          handleClickLogout={handleClickLogout}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default BurgerButton;
