import { DragEvent, FC } from "react";

interface DropZoneProps {
  dragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
  className: string;
}

const DropZone: FC<DropZoneProps> = ({ dragOverHandler, className }) => (
  <div className={className} onDragOver={(e) => dragOverHandler(e)} />
);

export default DropZone;
