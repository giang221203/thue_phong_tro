import clsx from "clsx";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { adminSidebar } from "~/utils/constants";
import { useState } from "react";

const AdminSidebar = () => {
  const [activeTabs, setactiveTabs] = useState([]);
  const handLeActiveTabs = (tabId) => {
    // click ẩn hiện tab con

    if (activeTabs.some((el) => el === tabId))
      setactiveTabs((prev) => prev.filter((el) => el !== tabId));
    else setactiveTabs((prev) => [...prev, tabId]);
  };
//   console.log(activeTabs);
  return (
    <div className="h-screen  w-full">
      <div className="w-full flex flex-col p-4 items-center justify-center">
        <img src="/logo1.png" alt="logo" className="w-3/5 object-contain" />
        <small className="text-gray-100 italic">Admin workspace</small>
      </div>
      <div className="mt-6">
        {adminSidebar?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                // link url nào trùng với active thì trả về true
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3",
                    isActive && "bg-main-700 border-r-4"
                  )
                }
                to={el.path}
              >
                <span className="text-2xl"> {el.icon}</span>
                <span className="select-none"> {el.name}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <>
                <div
                  onClick={() => handLeActiveTabs(el.id)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer gap-2 hover:bg-main-700"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-2xl"> {el.icon}</span>
                    <span className="select-none"> {el.name}</span>
                  </span>

                  {activeTabs.some((tabId) => tabId === el.id) ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropright size={20} />
                  )}
                </div>
                {activeTabs.some((tabId) => tabId === el.id) && (
                  <div>
                    {el.subs.map((sub) => (
                      <NavLink
                        key={sub.id}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3",
                            isActive && "bg-main-700 border-r-4"
                          )
                        }
                        to={sub.path}
                      >
                        <span className="text-2xl"> {sub.icon}</span>
                        <span className="select-none"> {sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
