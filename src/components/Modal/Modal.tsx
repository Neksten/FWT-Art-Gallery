import { FC, PropsWithChildren } from "react";
import { Portal } from "@components/Portal";
import Overlay from "@ui/Overlay/Overlay";

import styles from "./styles.module.scss";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  return (
    <Portal>
      <div className={styles.modal}>
        <Overlay isOpen={isOpen} />
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
