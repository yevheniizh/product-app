import React, { forwardRef } from "react";
import cn from "classnames";

import "./Layout.css";

export const Layout = forwardRef(({ className, ...props }, ref) => (
  <main {...props} className={cn("layout", className)} ref={ref} />
));
