import React from "react";
import { Link } from "react-router-dom";
import Images from "assets";
import { PATHS } from "configs/routes.config";
import * as pages from "pages";

function NotFound() {
  return (
    <div className={"w-4/5 mx-44 mt text-center mt-10"}>
      <p className={"mb-3"}>صفحه‌ای که دنبال آن بودید پیدا نشد!</p>
      <Link to={PATHS.HOME} element={pages.Home} className={"text-sky-500"}>
        بازگشت به صفحه اصلی
      </Link>
      <img src={Images.NotFound} alt="page-not-found" className={"mt-10 m-auto mr-[17.5rem]"} />
    </div>
  );
}

export { NotFound };
