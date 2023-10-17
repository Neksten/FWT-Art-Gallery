import { DragEvent, FC, PropsWithChildren } from "react";

interface DropZoneProps extends PropsWithChildren {
  dragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
}

const DropZone: FC<DropZoneProps> = ({ dragOverHandler, children }) => (
  <div onDragOver={(e) => dragOverHandler(e)}>{children}</div>
);

export default DropZone;
