import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const InputForm = ({
  style = "form-input",
  containerClassName,
  label,
  id,
  type = "text",
  register,
  error,
  inputClassName,     // css cho input
  validate,
  placeholder
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-2 w-full px-4"))}>
      {label && <label className="font-medium text-main-700" htmlFor={id}>{label}</label>}
      <input
        className={twMerge(clsx(style,'placeholder:text-sm', inputClassName))}
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id, validate)}
      />
      {error && error[id] && <small className="text-red-500">{error[id]?.message}</small>}
    </div>
  );
};

export default InputForm;
