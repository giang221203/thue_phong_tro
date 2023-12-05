import clsx from "clsx";
import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import withRouter from "~/hooks/withRouter";

const Topheader = ({location}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "h-[85px] text-white bg-transparent border-b border-main-400 w-full flex justify-between items-center fixed z-50 top-0 px-[100px] py-[26px]",
          location.pathname !== '/' && 'bg-main-700'    // nếu click khác trang home thì đổi backgrou thông qua location
        )
      )}
    >
      <span className=" flex items-center gap-2">
        <AiOutlineMail />
        <span>
          <span>Email us at :</span>
          <span className="text-gray-300">example@gmail.com</span>
        </span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center text-xl text-gray-300 gap-6">
          <FaFacebookF />
          <FaInstagram size={18} />
          <FaYoutube size={20} />
        </div>
        <div className="flex items-center pl-8 border-l border-main-400">
          <span className="flex items-center gap-2">
            <AiOutlinePhone />

            <span className="text-gray-300">123-456 7890</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Topheader);
