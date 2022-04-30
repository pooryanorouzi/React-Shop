import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { editProductAction } from "redux/actions/products.action";
import { removeAllItemsFromCart } from "redux/actions/cart.action";
import { postOrder } from "api/order.api";
import toast from "react-hot-toast";
import httpService from "services/http.service";
import Images from "assets";

function Payment() {
  const location = useLocation();
  const dispatch = useDispatch();

  const paymentResult = location.search.split("=")[1];

  const getOrdersFromServer = async (event) => {
    event.preventDefault();
    const response = await httpService.get("/Orders");
    console.log(response.data);
  };

  useEffect(() => {
    if (paymentResult === "success") {
      const orders = JSON.parse(localStorage.getItem("Orders"));
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      cartItems &&
        cartItems.forEach((element) => {
          const newCount = +element.maxCount - +element.quantity;
          const newData = { ...element, maxCount: newCount };
          dispatch(editProductAction(element.id, { [`count`]: `${newCount}` }));
        });
      orders &&
        postOrder(orders)
          .then(() => {
            dispatch(removeAllItemsFromCart());
          })
          .catch(() => toast.error("خطایی در سرور رخ داده است"));
    }
  }, []);

  return (
    <div className="bg-gray-100 h-screen w-screen">
      {paymentResult === "success" ? (
        <div className={"h-[50%] px-80 flex justify-center pt-12"}>
          <div
            className={
              "mt-7 py-10 rounded-md border h-[26rem] w-[70%] flex flex-col items-center bg-white shadow-lg"
            }
          >
            <img src={Images.Success} alt="" className={"w-96 mr-48 mt-6"} />
            <p className={"text-xl -mt-[3.7rem]"}>عملیات با موفقیت انجام شد</p>
            <p className="py-5">
              جهت پیگیری سفارشات به پنل کاربری خود مراجعه کنید
            </p>
          </div>
        </div>
      ) : (
        <div className={"h-screen px-64 flex justify-center pt-12"}>
        <div className="bg-white shadow-lg rounded-lg w-[70%] h-[32rem] flex flex-col items-center">
          <img src={Images.Failed} alt="" className={"w-28 mt-10"} />
          <p className={"mt-12 text-xl"}>پرداخت انجام نشد</p>
          <p className={"text-rose-500 text-2xl font-bold mt-3"}>
            فدای سرتون، یکبار دیگه!
          </p>
          <p className={"mt-7 text-xl"}>شماره سفارش:</p>
          <p className={"mt-2 text-lg"}>233957896</p>
          <p className={"w-1/2 my-7 text-center text-lg"}>
            چنانچه طی این فرآیند مبلغی از حساب شما کسر شده است، طی 72 ساعت آینده
            به حساب شما باز خواهد گشت
          </p>
        </div>
        </div>
      )}
    </div>
  );
}

export { Payment };
