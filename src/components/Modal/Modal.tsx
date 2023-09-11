import { FC, PropsWithChildren } from "react";

import { Portal } from "@/components/Portal";
import { Overlay } from "@/ui/Overlay";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, children }) => (
  <Portal>
    <Overlay isOpen={isOpen} onClick={closeModal} />
    {children}
  </Portal>
);

export default Modal;
