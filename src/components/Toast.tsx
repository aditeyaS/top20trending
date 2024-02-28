import { useEffect } from "react";
import ToastModel from "../models/ToastModel";

type ToastProps = {
  toastData: ToastModel;
  onClose: () => void;
};

const Toast = ({ toastData, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  const toastColor =
    toastData.type === "SUCCESS" ? "alert-success" : "alert-error";
  const textColor =
    toastData.type === "SUCCESS"
      ? "text-success-content"
      : "text-error-content";
  return (
    <div className="toast toast-start w-full z-50">
      <div className={`alert ${toastColor} ${textColor} flex justify-center`}>
        <span>{toastData.message}</span>
      </div>
    </div>
  );
};

export default Toast;
