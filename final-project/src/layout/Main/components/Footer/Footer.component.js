import React from "react";
import {
  BsInstagram,
  BsFacebook,
  BsLinkedin,
  BsTelegram,
} from "react-icons/bs";
import Images from "assets";

function Footer(props) {
  return (
    <div>
      <div
        className={
          "w-screen bg-black mt-10 flex justify-between items-center px-40 h-36"
        }
      >
        <div className={"text-white mr-4 -mt-3"}>
          <p className={"font-semibold"}>
            ما را در شبکه های اجتماعی دنبال کنید
          </p>
          <div className={"flex mt-4"}>
            <a
              href="https://www.instagram.com/"
              className={"text-2xl"}
              target={"_blank"}
              rel="noreferrer"
            >
              <BsInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              className={"text-2xl mx-5"}
              target={"_blank"}
              rel="noreferrer"
            >
              <BsFacebook />
            </a>
            <a
              href="https://www.linkedin.com/"
              className={"text-2xl ml-5"}
              target={"_blank"}
              rel="noreferrer"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://telegram.org/"
              className={"text-2xl"}
              target={"_blank"}
              rel="noreferrer"
            >
              <BsTelegram />
            </a>
          </div>
        </div>
        <div className={""}>
          <p className={"text-white"}>از آخرین تخفیفات باخبر شوید</p>
          <form action="#" className={"mt-2"}>
            <div
              className={
                "rounded-lg w-96 px-5 bg-white py-1 flex items-center justify-between"
              }
            >
              <input
                type="text"
                placeholder={"ایمیلتو وارد کن"}
                className={"focus:outline-none text-gray-600"}
              />
              <button
                className={"rounded-lg text-white bg-green-500 mr-10 px-3 py-2"}
              >
                ارسال
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={"flex items-center justify-center h-10"}>
            <p className={"text-gray-400 text-xs px-5"}>درباره سان پلاس</p>
            <p className={"text-gray-400 text-xs px-5 border-x"}>شرایط و ضوابط</p>
            <p className={"text-gray-400 text-xs px-5"}>حریم خصوصی</p>
      </div>
      <hr className={"w-5/6 mx-44"} />
      <div className={"h-16 mx-44 flex items-center"}>
            <p>روش های پرداخت با </p>
            <div className={"flex"}>
                <img src={Images.Zibal} alt="Zibal" className={"w-16 mr-3"} />
                <img src={Images.Jibimo} alt="Jibimo" className={"w-16 mr-3"} />
            </div>
      </div>
    </div>
  );
}

export { Footer };
