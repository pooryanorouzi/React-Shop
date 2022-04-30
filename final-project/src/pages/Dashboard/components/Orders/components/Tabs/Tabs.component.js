import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveredOrdersAction,
  getPendingOrdersAction,
  editOrderAction,
} from "redux/actions/orders.action";
import ReactPaginate from "react-paginate";
import moment from "jalali-moment";
import persian from "react-date-object/calendars/persian";
import http from "services/http.service";
import { ORDERS } from "configs/url.config";
import "./tabs.css";
import { DateObject } from "react-multi-date-picker";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);
  const [isOpenModalCheckStatusPending, setIsOpenModalCheckStatusPending] =
    useState(false);
  const [isOpenModalCheckStatusDelivered, setIsOpenModalCheckStatusDelivered] =
    useState(false);
  const [page, setPage] = useState(1);
  const [orderId, setOrderId] = useState();
  const [orderDetail, setOrderDetail] = useState();

  const dispatch = useDispatch();
  const getAllOrders = useSelector((state) => state.ordersState.allOrders);
  const getPendingOrders = useSelector(
    (state) => state.ordersState.pendingOrders
  );
  const getDeliveredOrders = useSelector(
    (state) => state.ordersState.deliveredOrders
  );

  useEffect(() => {
    console.log("pending orders:", getPendingOrders);
  }, [getPendingOrders]);

  useEffect(() => {
    if (toggleState === 1) {
      dispatch(getPendingOrdersAction("pending", page, 8));
    } else if (toggleState === 2) {
      dispatch(getDeliveredOrdersAction("delivered", page, 8));
    } else {
      return;
    }
  }, [page, toggleState, dispatch]);

  const pendingOrdersLength = Math.ceil(getPendingOrders.total / 8);
  const delivredOrdersLength = Math.ceil(getDeliveredOrders.total / 8);

  const openModalCheckStatusPending = async (id) => {
    setIsOpenModalCheckStatusPending(true);
    const getOrderDetail = await http.get(
      `${ORDERS}/${id}/?deliveredStatus=pending`
    );
    setOrderDetail(getOrderDetail.data);
    setOrderId(id);
  };

  const openModalCheckStatusDelivered = async (id) => {
    setIsOpenModalCheckStatusDelivered(true);
    const getOrderDetail = await http.get(
      `${ORDERS}/${id}/?deliveredStatus=delivered`
    );
    setOrderDetail(getOrderDetail.data);
  };

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleDeliveredOrder = async () => {
    const date = new DateObject().unix * 1000;
    await dispatch(
      editOrderAction(orderId, {
        ["deliveredStatus"]: "delivered",
        ["finalDeliveredDate"]: date,
      })
    );
    closeModalCheckStatusPending();
  };

  function closeModalCheckStatusDelivered() {
    setIsOpenModalCheckStatusDelivered(false);
  }

  function closeModalCheckStatusPending() {
    setIsOpenModalCheckStatusPending(false);
  }

  const handleClickDeliveredOrders = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };

  const handleClickPendingOrders = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };

  const tabIndex = async (index) => {
    setToggleState(index);
  };
  return (
    <div>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => tabIndex(1)}
        >
          سفارش های در انتظار ارسال
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => tabIndex(2)}
        >
          سفارش های تحویل شده
        </button>
      </div>
      {/* Pending Tab */}
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <table className="rounded-xl w-full mt-5">
            <thead className="bg-gray-200 border border-gray-500 text-gray-700 text-right">
              <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                نام کاربر
              </th>
              <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                مجموع مبالغ
              </th>
              <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                زمان ثبت سفارش
              </th>
              <th className="border border-gray-300 py-2 pr-3 text-center">
                عملیات
              </th>
            </thead>
            <tbody>
              {getPendingOrders.orders.length > 0 &&
                getPendingOrders.orders.map((items) => (
                  <tr key={items.id}>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      {items.customer}
                    </td>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      {numberWithCommas(+items.totalPrice)}
                    </td>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      {moment(items.createdAt).format("jYYYY/jM/jD")}
                    </td>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      <button
                        className="text-sky-600"
                        tabIndex="-1"
                        onClick={() => openModalCheckStatusPending(items.id)}
                      >
                        بررسی سفارش
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            onPageChange={handleClickPendingOrders}
            pageCount={pendingOrdersLength}
            nextLabel={""}
            previousLabel={""}
            renderOnZeroPageCount={null}
            containerClassName={
              "flex items-center justify-center pt-12 w-96 m-auto"
            }
            pageClassName={"pt-1 px-2 mx-1 border border-sky-500 rounded-[50%]"}
          />
        </div>
        {/* Pending Tab */}
        {/* Delivered Tab */}
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <table className="rounded-xl w-full mt-5">
            <thead className="bg-gray-200 border border-gray-500 text-gray-700 text-right">
              <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                نام کاربر
              </th>
              <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                مجموع مبالغ
              </th>
              <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                زمان ثبت سفارش
              </th>
              <th className="border border-gray-300 py-2 pr-3 text-center">
                عملیات
              </th>
            </thead>
            <tbody>
              {getDeliveredOrders.orders.length > 0 &&
                getDeliveredOrders.orders.map((items) => (
                  <tr key={items.id}>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      {items.customer}
                    </td>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      {numberWithCommas(+items.totalPrice)}
                    </td>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      {moment(items.createdAt).format("jYYYY/jM/jD")}
                    </td>
                    <td className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      <button
                        className="text-sky-600"
                        tabIndex="-1"
                        onClick={() => openModalCheckStatusDelivered(items.id)}
                      >
                        بررسی سفارش
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            tabIndex="-1"
            onPageChange={handleClickDeliveredOrders}
            pageCount={delivredOrdersLength}
            nextLabel={""}
            previousLabel={""}
            renderOnZeroPageCount={null}
            containerClassName={
              "flex items-center justify-center pt-12 w-96 m-auto"
            }
            pageClassName={"pt-1 px-2 mx-1 border border-sky-500 rounded-[50%]"}
          />
        </div>
      </div>
      {/* Delivered Tab */}
      {/* Pending Modal */}
      <Transition appear show={isOpenModalCheckStatusPending} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto shadow-xl backdrop-blur-[2px] overflow-hidden"
          onClose={closeModalCheckStatusPending}
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left text-gray-700 align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 flex items-center justify-between ml-3"
                >
                  <span>نمایش سفارش</span>
                  <button
                    onClick={closeModalCheckStatusPending}
                    className={"text-rose-500 text-2xl"}
                    tabIndex="-1"
                  >
                    <RiCloseCircleFill />
                  </button>
                </Dialog.Title>
                <div className="mt-12">
                  <div className="flex items-center justify-justify-items-end mr-28">
                    <p>نام خریدار :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail ? orderDetail.customer : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-items-end mr-28 mt-3">
                    <p>آدرس :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail ? orderDetail.address : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>تلفن :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail
                        ? orderDetail.phoneNumber
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>زمان سفارش :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail
                        ? moment(orderDetail.createdAt).format("jYYYY/jM/jD")
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>وضعیت سفارش :</p>
                    <p className="mr-2">
                      {!!orderDetail &&
                      orderDetail.deliveredStatus === "pending"
                        ? "در انتظار تحویل"
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>زمان تحویل خواسته شده:</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail
                        ? moment(orderDetail.deliveredAt).format("jYYYY/jM/jD")
                        : ""}
                    </p>
                  </div>
                </div>
                <table className="rounded w-96 mx-auto mt-10 ">
                  <thead className="bg-gray-200 border border-gray-500 text-gray-700 text-right">
                    <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      کالا
                    </th>
                    <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      قیمت
                    </th>
                    <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      تعداد
                    </th>
                  </thead>
                  <tbody>
                    {!!orderDetail &&
                      orderDetail.selectedItems.map((items) => (
                        <tr className="border py-2 pr-3 px-3">
                          <td className="border py-2 pr-3 px-3 text-center">
                            {items.title} {items.brand}
                          </td>
                          <td className="border py-2 pr-3 px-3 text-center">
                            {numberWithCommas(+items.price)}
                          </td>
                          <td className="border py-2 pr-3 px-3 text-center">
                            {items.count}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg ml-36 mt-6"
                  type="submit"
                  tabIndex="-1"
                  onClick={handleDeliveredOrder}
                >
                  تحویل شد
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Pending Modal */}
      {/* Delivered Modal */}
      <Transition appear show={isOpenModalCheckStatusDelivered} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto shadow-xl backdrop-blur-[2px] overflow-hidden"
          onClose={closeModalCheckStatusDelivered}
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left text-gray-700 align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 flex items-center justify-between ml-3"
                >
                  <span>نمایش سفارش</span>
                  <button
                    onClick={closeModalCheckStatusDelivered}
                    className={"text-rose-500 text-2xl"}
                  >
                    <RiCloseCircleFill />
                  </button>
                </Dialog.Title>
                <div className="mt-12">
                  <div className="flex items-center justify-justify-items-end mr-28">
                    <p>نام خریدار :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail ? orderDetail.customer : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-items-end mr-28 mt-3">
                    <p>آدرس :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail ? orderDetail.address : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>تلفن :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail
                        ? orderDetail.phoneNumber
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>زمان سفارش :</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail
                        ? moment(orderDetail.createdAt).format("jYYYY/jM/jD")
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>وضعیت سفارش :</p>
                    <p className="mr-2">
                      {!!orderDetail &&
                      orderDetail.deliveredStatus === "delivered"
                        ? "تحویل شده"
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>زمان تحویل خواسته شده:</p>
                    <p className="mr-5">
                      {!!orderDetail && orderDetail
                        ? moment(orderDetail.deliveredAt).format("jYYYY/jM/jD")
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-justify-items-end mr-28 mt-3">
                    <p>زمان تحویل داده شده :</p>
                    <p className="mr-3">
                      {!!orderDetail && orderDetail.finalDeliveredDate
                        ? moment(orderDetail.finalDeliveredDate).format(
                            "jYYYY/jM/jD"
                          )
                        : "لیست قدیمی تاریخ ندارد"}
                    </p>
                  </div>
                </div>
                <table className="rounded w-96 mx-auto mt-10 ">
                  <thead className="bg-gray-200 border border-gray-500 text-gray-700 text-right">
                    <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      کالا
                    </th>
                    <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      قیمت
                    </th>
                    <th className="border border-gray-300 py-2 pr-3 px-3 text-center">
                      تعداد
                    </th>
                  </thead>
                  <tbody>
                    {!!orderDetail &&
                      orderDetail.selectedItems.map((items) => (
                        <tr className="border py-2 pr-3 px-3">
                          <td className="border py-2 pr-3 px-3 text-center">
                            {items.title} {items.brand}
                          </td>
                          <td className="border py-2 pr-3 px-3 text-center">
                            {numberWithCommas(+items.price)}
                          </td>
                          <td className="border py-2 pr-3 px-3 text-center">
                            {items.count}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="mt-5"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Delivered Modal */}
    </div>
  );
}

export { Tabs };
