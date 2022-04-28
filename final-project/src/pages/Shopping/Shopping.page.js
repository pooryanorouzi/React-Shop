import React, { useState, Fragment } from "react";
import Images from "assets";
import { Link } from "react-router-dom";
import { PATHS } from "configs/routes.config";
import * as pages from "pages";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { removeFromCart } from "redux/actions/cart.action";
import EditableLabel from "react-inline-editing";
import { editProductAction } from "redux/actions/products.action";

function Shopping(props) {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const cartsData = useSelector((state) => state.cartState);
  const { cartItems } = cartsData;

  const handleEditQuantity = async (id, quantity) => {
    console.log(id, quantity);
    const item = cartItems.filter((item) => item.id === id)
    console.log(item);
  };

  function closePopup() {
    setIsOpenPopup(false);
  }

  function openPopup(product) {
    setIsOpenPopup(true);
    setProduct(product);
  }
  const handleDeleteItem = () => {
    dispatch(removeFromCart(product.id));
    closePopup();
  };

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className={"w-4/5 mx-44 mt-6 h-auto"}>
      <Transition appear show={isOpenPopup} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[1px] overflow-hidden"
          onClose={closePopup}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="shadow-xl inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between ml-3"
                >
                  <span>
                    آیا کالا با عنوان{" "}
                    {product ? product.title + " " + product.brand : ""} حذف
                    شود؟
                  </span>
                </Dialog.Title>
                <div className="">
                  <form className={"text-right"}>
                    <div className={"flex items-center justify-end"}>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-sky-500 focus:outline-none border border-transparent rounded-lg mt-5"
                        onClick={handleDeleteItem}
                      >
                        بله
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium focus:outline-none text-white bg-rose-500 border border-transparent rounded-lg mt-5 mr-5"
                        onClick={closePopup}
                      >
                        خیر
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-4"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {!!cartItems.length ? (
        <div className="w-4/5 border h-auto rounded-md bg-white shadow-sm p-7">
          <table className="w-4/5 m-auto border border-gray-200 rounded-xl text-right border-collapse">
            <thead>
              <tr className="border  bg-gray-200 text-center py-2">
                <th className="border border-gray-300 pr-5 py-1.5">
                  تصویر کالا
                </th>
                <th className="border border-gray-300 px-5 py-1.5">کالا</th>
                <th className="border border-gray-300 px-5 py-1">قیمت</th>
                <th className="border border-gray-300 px-5 py-1">تعداد</th>
                <th className="border border-gray-300 px-5 py-1">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr
                  className="border hover:bg-gray-100 text-center"
                  key={product.id}
                >
                  <td className="flex justify-center items-center">
                    <img
                      src={`http://localhost:3002/files/${product.thumbnail}`}
                      alt="pic"
                      className="w-9"
                    />
                  </td>
                  <td className="border border-gray-200 pr-5 py-1.5 text-[1rem]">
                    {product.title} {product.brand}
                  </td>
                  <td className="border border-gray-200 pr-5 py-1 text-[1rem]">
                    {numberWithCommas(product.price)}
                  </td>
                  <td className="border text-center border-gray-200  py-1 text-[1rem]">
                    <EditableLabel
                      text={product.quantity}
                      id={product.id}
                      onFocusOut={(e) => handleEditQuantity(product.id, +e)}
                      inputWidth="77px"
                    />
                  </td>
                  <td className="border border-gray-200 pr-5 py-1 text-[1rem]">
                    <button
                      className="bg-rose-500 rounded-lg border border-transparent text-white px-2 py-1"
                      onClick={() => openPopup(product)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mx-20 mt-10">
            <p className="mr-3">
              مجموع :{" "}
              {numberWithCommas(
                cartItems.reduce(
                  (acc, item) => acc + Number(item.price * item.quantity),
                  0
                )
              )}
            </p>
            <Link
              to={PATHS.FINAL_PAYMENT}
              element={pages.FinalPayment}
              className={"bg-green-500 text-white rounded-lg px-4 py-2 ml-2"}
            >
              نهایی کردن سبد خرید
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-4/5 pb-7 border h-auto rounded flex flex-col items-center bg-white shadow-sm">
          <figure>
            <img src={Images.EmptyCart} alt="" className={"mt-3 m-auto"} />
            <figcaption className={"text-center mr-5 mt-5 text-xl"}>
              سبد خرید شما خالی است!
            </figcaption>
          </figure>
          <p className={"text-gray-500 text-sm text-center mt-12"}>
            برای دیدن محصولات بیشتر و خرید کالا به صفحات زیر بروید:
          </p>
          <div className={"mt-7 flex justify-center"}>
            <Link
              to={PATHS.CATEGORY}
              element={pages.Category}
              className={"text-sky-500 border-l px-5 text-semibold"}
            >
              دسته بندی ها
            </Link>
            <Link
              to={PATHS.POPULAR}
              element={pages.Popular}
              className={"text-sky-500 px-5 text-semibold"}
            >
              محصولات پرطرفدار
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export { Shopping };
