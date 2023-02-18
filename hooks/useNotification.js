import React, { useState, useEffect } from "react";

const useNotification = () => {
  const [show, setShow] = useState(false);

  const Notification = ({ message, type }) =>
    show ? (
      <div
        className={`flex items-center justify-center ${
          type === "success" ? "bg-success" : "bg-error"
        }`}
      >
        {message}
      </div>
    ) : null;

  useEffect(() => {
    let timerId;
    if (show) {
      timerId = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [show, setShow]);

  return { Notification };
};

export default useNotification;
