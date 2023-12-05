import React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../commons/Button";
import { navigations } from "~/utils/constants";
import clsx from "clsx";
import withRouter from "~/hooks/withRouter";
import { twMerge } from "tailwind-merge";

const Navigation = ({ location }) => {
  return (
    <div
      className={twMerge(
        clsx(
          " w-full bg-transparent fixed flex items-center justify-between z-50 top-[85px] px-[100px] py-[26px]",
          location.pathname !== "/" && "bg-white"
        )
      )}
    >
      <Link to="/">
        <img src="/logo1.png" alt="logo" className="w-[120px] object-contain" />
      </Link>
      <div
        className={clsx(
          "flex  text-lg items-center gap-6",
          location.pathname === "/" ? "text-main-100" : "text-main-700"
        )}
      >
        {navigations?.map((item) => (
          <NavLink
            className={({ isActive }) =>
              clsx(
                isActive && "text-white font-medium",
                location.pathname === "/" ? "text-white" : "text-gray-900"
              )
            }
            key={item.id}
            to={item.path}
          >
            {item.text}
          </NavLink>
        ))}
        <Button
          className={twMerge(
            clsx(
              location.pathname === "/" &&
                "bg-transparent border-main-100 border"
            )
          )}
        >
          Add listing
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Navigation);
