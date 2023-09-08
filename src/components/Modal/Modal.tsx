import { FC, PropsWithChildren } from "react";

import { Portal } from "@/components/Portal";
import { Overlay } from "@/ui/Overlay";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({ isOpen, children }) => (
  <Portal>
    <Overlay isOpen={isOpen} />
    {children}
  </Portal>
);

export default Modal;
