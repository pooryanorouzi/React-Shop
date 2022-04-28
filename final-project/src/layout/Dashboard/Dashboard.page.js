import React, { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { PATHS } from "configs/routes.config";
import { Products, Orders, Quantity } from "pages/Dashboard/components";
import DarkModeToggle from "react-dark-mode-toggle";
import { ACCESS_TOKEN, IS_LOGGED_IN } from "configs/variables.config";

function Dashboard(props) {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const navigate = useNavigate();
  const params = useParams();

  const isLoggedIn = localStorage.getItem(IS_LOGGED_IN) === "true";

  const handleExitFromDashboard = () => {
    localStorage.setItem(IS_LOGGED_IN, false.toString()); 
    localStorage.removeItem(ACCESS_TOKEN);
    navigate(`${PATHS.SIGN_IN}`);
  };

  return (
    <div
      className={
        isDarkMode ? "bg-[#0D3451] text-white" : "bg-white w-screen h-screen"
      }
    >
      {/* Header */}
      <div
        className={
          isDarkMode
            ? `flex items-center justify-between bg-white text-black hover:text-red-500`
            : `flex items-center justify-between bg-[#0D3451] shadow-2xl w-screen py-8 px-44`
        }
      >
        <h1 className={"text-white text-xl overflow-hidden mt-2"}>
          پنل مدیریت فروشگاه
        </h1>
        <ul className={"flex items-center justify-center text-white"}>
          <li
            className={
              "flex items-center border-2 border-l-0 px-3 py-2 rounded-lg rounded-l-none active:bg-blue-600 active:text-white"
            }
          >
            <Link
              to={PATHS.PANEL_PRODUCTS}
              element={<Products />}
              className={"mr-1 "}
              tabIndex={"-1"}
            >
              کالاها
            </Link>
          </li>
          <li
            className={
              "flex items-center border-2 px-3 py-2 active:bg-blue-600 active:text-white"
            }
          >
            <Link
              to={PATHS.PANEL_QUANTITY}
              element={<Quantity />}
              className={"mr-1"}
              tabIndex={"-1"}
            >
              موجودی و قیمت ها
            </Link>
          </li>
          <li
            className={
              "flex items-center border-r-0 border-2 px-3 py-2 rounded-lg rounded-r-none active:bg-blue-600 active:text-white"
            }
          >
            <Link
              to={PATHS.PANEL_ORDERS}
              element={<Orders />}
              className={"mr-1"}
              tabIndex={"-1"}
            >
              سفارش ها
            </Link>
          </li>
        </ul>
        <div className={"flex items-center -mt-2"}>
          <button className={"ml-3 mt-2 text-xl text-yellow-400"} tabIndex="-1">
            {/* <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={55}
            /> */}
            <BsFillMoonStarsFill />
          </button>
          <Link
            to={PATHS.HOME}
            className={"mr-2 mt-3 text-white"}
            tabIndex={"-1"}
          >
            بازگشت به سایت
          </Link>
          <button
            to={PATHS.SIGN_IN}
            className={"mr-4 mt-3 text-white"}
            tabIndex={"-1"}
            onClick={handleExitFromDashboard}
          >
            خروج
          </button>
        </div>
      </div>
      {/* Header */}

      <div className={" mt-8"}>
        <Outlet />
      </div>
    </div>
  );
}

export { Dashboard };
