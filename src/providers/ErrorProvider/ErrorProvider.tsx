import { FC, PropsWithChildren, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

import { useAppSelector } from "@/hooks/redux";

import { Portal } from "@/components/Portal";
import { Toast } from "@/ui/Toast";

const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { error } = useAppSelector((state) => state.errorSlice);

  useEffect(() => {
    if (error) {
      const toastId = String(Date.now());
      toast.custom(
        <Toast closeToast={() => toast.remove(toastId)}>{error}</Toast>,
        {
          id: toastId,
          duration: 4000,
          position: "bottom-right",
        }
      );
    }
  }, [error]);

  return (
    <>
      <Portal>
        <Toaster />
      </Portal>
      {children}
    </>
  );
};

export default ErrorProvider;
