import React from "react";
import cn from "classnames";
import "./Option.css";

export const Option = ({ id, value, name, checked, rounded, className, children, ...props }) => {
  return (
    <label htmlFor={id} className={cn("option", className, { rounded, checked })} {...props}>
      {children}
      <input id={id} type="radio" value={value} name={name} hidden />
    </label>
  );
};
