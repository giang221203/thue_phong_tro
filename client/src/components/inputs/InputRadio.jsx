import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const InputRadio = ({
  style = "form-radio",
  containerClassName,
  label,
  id,
  register,
  error,
  inputClassName, // css cho input
  validate,
  options = [],
}) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full ", containerClassName)
      )}
    >
        {label && <label className="font-medium text-main-700" htmlFor={id}>{label}</label>}
      {options.map((el) => (  
        // map để tạo ra nhiều ô radio
        <div className="flex items-center gap-4 " key={el.value}>
          <input
            type="radio"
            name={id} // radio cần có name
            id={el.value}
            value={el.value}   // input radio trong react-hook-form cần có value để lấy giá trị dữ liệu
            className={twMerge(clsx(style, "cursor-pointer", inputClassName))}
            {...register(id, validate)}
          />
          <label className="cursor-pointer" htmlFor={el.value}>
            {el.label}
          </label>
        </div>
      ))}
      {error && error[id] && (
        <small className="text-red-500">{error[id]?.message}</small>
      )}
    </div>
  );
};

export default InputRadio;
