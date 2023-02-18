import React from "react";

const Card = ({ children, className }) => (
  <div
    className={`shadow-black shadow-3xl flex gap-4 p-8 h-fit relative top-52 grow flex-col m-auto border-2 justify-around max-w-sm w-full ${
      className ? className : ""
    } `}
  >
    {children}
  </div>
);

export default Card;
