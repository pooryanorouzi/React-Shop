import React from "react";
import { RiMenu3Line, RiShoppingCartLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { GrUserExpert } from "react-icons/gr";
import Images from "assets";
import { Link } from "react-router-dom";
import { PATHS } from "configs/routes.config";
import * as pages from "pages";
import { useSelector } from "react-redux";
import { ACCESS_TOKEN } from "configs/variables.config";

function Header(props) {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return (
    <div className={""}>
      <div
        className={
          "header flex py-5 px-2 rounded-lg my-5 w-[80%] mx-44 items-center bg-white shadow-sm"
        }
      >
        <div className="menuBar flex items-center">
          <button className={"text-xl"}>
            <RiMenu3Line />
          </button>
          <span className={"mr-1 text-lg mt-0.5"}>منو</span>
          <Link to={PATHS.HOME} element={pages.Home} className={"mx-5"}>
            <img src={Images.Logo} alt="logo" className={"w-10 h-10"} />
          </Link>
        </div>
        <input
          type="search"
          name="search"
          id="searchInput"
          placeholder={"بین هزاران محصول جست و جو کنید"}
          className={
            "w-[27.4rem] text-gray-600 px-3 py-2 rounded-md bg-gray-100 text-sm focus:outline-none"
          }
        />
        <div className={"left-side flex mr-[5.4rem] relative"}>
          <span
            className={
              "text-2xl ml-3 border border-transparent rounded-[50%] bg-gray-100 p-3"
            }
          >
            <BiSupport />
          </span>
          <div className="support">
            <p className={""}>به کمک احتیاج دارید؟</p>
            <p>02132322651</p>
          </div>
          <button
            className={
              "border border-transparent rounded-[50%] bg-green-100 p-3 text-xl mr-10"
            }
          >
            <GrLocation />
          </button>
          <span className={"mr-2 mt-3"}>نشانی فروشگاه</span>
          {!!accessToken ? (
            <Link
              to={PATHS.DASHBOARD}
              className="border border-rose-600 text-rose-600 rounded-lg mr-9 py-3 px-5 transition-all duration-300 ease-in-out
               hover:bg-rose-500 hover:text-white"
            >
              پنل کاربری
            </Link>
          ) : (
            <Link
              to={PATHS.SIGN_IN}
              className={
                "flex border border-rose-500 text-rose-500 rounded-lg items-center mr-8 px-3 transition-all ease-in-out duration-300 hover:bg-red-500 hover:text-white"
              }
            >
              ورود / ثبت نام
            </Link>
          )}
          <Link
            to={PATHS.SHOPPING}
            element={pages.Shopping}
            className={"border-r text-3xl mr-3 pt-2 pr-3"}
          >
            <span class="inline-flex items-center absolute left-4 -top-0 p-1 pb-2 text-center mr-2 text-sm font-semibold text-white bg-rose-500 rounded-full">
              <span className="w-4 h-3 ">{cartItems.length}</span>
            </span>
            <RiShoppingCartLine />
          </Link>
        </div>
      </div>
      <hr className={"-mt-1"} />
    </div>
  );
}

export { Header };
