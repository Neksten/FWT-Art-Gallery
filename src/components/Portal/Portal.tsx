import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface PortalProps extends PropsWithChildren {
  key?: any;
}

const Portal: FC<PortalProps> = ({ children, key }) =>
  createPortal(children, document.body, key);

export default Portal;
