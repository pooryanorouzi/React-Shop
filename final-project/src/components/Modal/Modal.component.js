import React from "react";
import { RiCloseFill } from "react-icons/ri";

function Modal({ setIsOpen }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className={
          "modal border shadow-md rounded-lg mx-auto w-full h-auto text-right px-4 flex flex-col justify-center py-4"
        }
      >
        <div className={"flex items-center justify-between"}>
          <p>افزودن/ویرایش کالا</p>
          <button
            className={
              "text-red-500 text-2xl transition duration-300 rounded-[50%] hover:text-white hover:bg-red-500 p-1"
            }
            tabIndex={"-1"}
            onClick={() => setIsOpen(false)}
          >
            <RiCloseFill />
          </button>
        </div>
        <form className={"mt-5"} onSubmit={handleSubmit}>
          <label htmlFor="image" className={""}>
            تصویر کالا: <br />
            <input
              type="text"
              className={"border mt-2 rounded w-[18.5rem] "}
              disabled
              readOnly
            />
            <input
              type="file"
              className={
                "absolute text-transparent top-[6.1rem] right-[21rem] opacity-0 cursor-pointer "
              }
              tabIndex={"-1"}
            />
            <button
              className={
                "bg-sky-500 text-white px-5 py-1 rounded-lg mr-7 text-center cursor-pointer"
              }
            >
              افزودن
            </button>
          </label>
          <br />
          <label htmlFor={"name"}>
            <p className={"mt-5"}>نام کالا:</p>
            <input
              type="text"
              className={
                "w-full rounded border px-2 py-1 text-gray-600 focus:outline-none"
              }
              name={"name"}
              id={"name"}
              tabIndex={"-1"}
            />
          </label>
          <br />
          <label htmlFor="category">
            <p className={"mt-5"}>دسته بندی:</p>
            <select
              name="category"
              id="category"
              className={"w-full rounded-md border p-1 mt-2 focus:outline-none"}
              tabIndex={"-1"}
            >
              <option value="select">انتخاب دسته بندی</option>
              <option value="basic">کالاهای اساسی</option>
              <option value="dairy">لبنیات</option>
              <option value="Condiment">افزودنی‌ها</option>
              <option value="Bean">حبوبات</option>
              <option value="drink">نوشیدنی‌ها</option>
              <option value="fruit">میوه و سبزیجات</option>
            </select>
          </label>
          <label htmlFor="textarea" className={""}>
            <p className={"mt-5"}>توضیحات: </p>
            <textarea
              name="textarea"
              id="textarea"
              rows="3"
              className={
                "w-full p-3 mt-2 text-gray-600 text-sm resize-none border rounded focus:outline-none"
              }
              maxLength={"250"}
              tabIndex={"-1"}
            />
          </label>
          <button
            type={"submit"}
            className={
              "px-4 py-2 bg-sky-500 text-white rounded-lg mt-5 mr-[40%]"
            }
            tabIndex={"-1"}
            onClick={() => setIsOpen(false)}
          >
            ذخیره
          </button>
        </form>
      </div>
    </div>
  );
}

export { Modal };
