import { FC, PropsWithChildren, useEffect, useRef } from "react";

interface IOutsideClickHandlerProps extends PropsWithChildren {
  onOutsideClick: () => void;
}

const OutsideClickHandler: FC<IOutsideClickHandlerProps> = ({
  onOutsideClick,
  children,
}) => {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
};

export default OutsideClickHandler;
