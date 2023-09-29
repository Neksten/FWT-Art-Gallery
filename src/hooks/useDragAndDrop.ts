import { ChangeEvent, DragEvent, useState } from "react";

export const useDragAndDrop = () => {
  const [drag, setDrag] = useState(false);

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (
    e: DragEvent<HTMLDivElement>,
    onBlur: () => void
  ): File => {
    e.preventDefault();
    onBlur();
    setDrag(false);
    return [...e.dataTransfer.files][0];
  };
  const onImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    onBlur: () => void
  ): File | null => {
    onBlur();
    const selectedFile = e.target.files && e.target.files[0];
    return selectedFile || null;
  };

  return {
    drag,
    dragOverHandler,
    dragLeaveHandler,
    onDropHandler,
    onImageChange,
  };
};
