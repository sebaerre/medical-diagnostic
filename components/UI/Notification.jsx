import React, { useEffect } from "react";

const Notification = ({ setShowNotif, show, type, message }) => {
  useEffect(() => {
    let timerId;
    if (show) {
      timerId = setTimeout(() => {
        setShowNotif(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [show, setShowNotif]);

  return show ? (
    <div
      className={`flex items-center justify-center ${
        type === "success" ? "bg-success" : "bg-error"
      }`}
    >
      {message}
    </div>
  ) : null;
};

export default React.memo(Notification);
