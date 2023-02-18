import React from "react";

const Container = ({ classNames, children }) => (
  <div className={`flex ${classNames ? classNames : ""}`}>{children}</div>
);

export default Container;
