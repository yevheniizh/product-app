import React from "react";
import cn from "classnames";
import "./OptionGroup.css";

export const OptionGroup = ({ id, className, ...props }) => {
  return <fieldset id={id} className={cn("option-group", className)} {...props} />;
};
