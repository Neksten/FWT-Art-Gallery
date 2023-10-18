export const handleEscapeKey = (action: () => void) => {
  const close = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      action();
    }
  };

  window.addEventListener("keydown", close);

  return () => window.removeEventListener("keydown", close);
};
