import { FC, PropsWithChildren } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";

import { Portal } from "@/components/Portal";
import { Overlay } from "@/ui/Overlay";

interface ModalProps extends PropsWithChildren {
  closeModal: () => void;
  menuClass: "open" | "delete";
}

const Modal: FC<ModalProps> = ({ closeModal, menuClass, children }) => (
  <Portal>
    <RemoveScrollBar gapMode="padding" />
    <div className="modal">
      <Overlay onClick={closeModal} menuClass={menuClass} />
      {children}
    </div>
  </Portal>
);

export default Modal;
