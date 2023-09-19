import { FC, ReactNode, useEffect, useRef } from "react";

interface IOutsideClickHandlerProps {
  onOutsideClick: (value: boolean) => void;
  children?: ReactNode;
}

// Выполнит onOutsideClick если клик произошел вне элемента
const OutsideClickHandler: FC<IOutsideClickHandlerProps> = ({
  onOutsideClick,
  children,
}) => {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // если клик произошел вне dropdown, то закрыть его
      if (
        ref.current &&
        event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        onOutsideClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
};

export default OutsideClickHandler;
