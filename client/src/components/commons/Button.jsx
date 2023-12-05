import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import withRouter from "~/hooks/withRouter";

const Button = ({ children, className, onClick, type = "button"}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        clsx("py-3 px-4 text-white bg-main-700 rounded-md", className)
      )}
    >
      {children}
    </button>
  );
};

export default withRouter(Button);