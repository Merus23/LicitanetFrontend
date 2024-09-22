import { IPopupControl } from "@/app/Interfaces/IGeneralInterfaces";
import React, { useState, useEffect } from "react";

type PopupProps = IPopupControl;

export default function Popup({ status, message }: PopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, message]);

  const closePopup = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-20 right-4 p-4 rounded shadow-lg text-white w-11/12 md:w-80 ${
        status ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <button
        onClick={closePopup}
        className="absolute top-2 right-2 text-white"
      >
        &times;
      </button>
      <p>{message}</p>
    </div>
  );
}
