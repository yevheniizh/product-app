import React, { forwardRef } from "react";
import cn from "classnames";
import "./HtmlContainer.css";

export const HtmlContainer = forwardRef(({ className, ...props }, ref) => (
  <section {...props} ref={ref} className={cn("html-container", className)} />
));
