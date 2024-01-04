import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import withRouter from "~/hooks/withRouter";
import { ImSpinner2 } from "react-icons/im";

const Button = ({ children, className, handleOnclick, type = "button",disabled}) => {
  return (
    <button
      type={type}
      onClick={handleOnclick}
      className={twMerge(
        clsx("py-3 px-4  text-white bg-main-700 rounded-md flex items-center gap-3 justify-center", className,disabled && 'opacity-50')
      )}
      disabled={disabled}
    >
    {disabled && (
       <span className="animate-spin"> <ImSpinner2 /></span>
    )}
      {children}
    </button>
  );
};

export default withRouter(Button);
