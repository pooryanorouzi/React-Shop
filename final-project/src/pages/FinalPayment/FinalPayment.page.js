import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import InputIcon from "react-multi-date-picker/components/input_icon";

function FinalPayment() {
  const [deliveryDate, setDeliveryDate] = useState();
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(3, "نام بسیار کوتاه است")
      .max(15, "نام بسیار طولانی است")
      .required("لطفا نام را وارد کنید"),
    lastname: Yup.string()
      .min(4, "نام خانوادگی بسیار کوتاه است")
      .max(255, "نام خانوادگی بسیار طولانی است")
      .required("لطفا نام خانوادگی را وارد کنید"),
    phoneNumber: Yup.string()
      .min(7, " شماره همراه بسیار کوتاه است")
      .max(10, "شماره تلفن بسیار طولانی است")
      .required("لطفا شماره تلفن را وارد کنید"),
    address: Yup.string()
      .min(3, "کمتر از 3 حرف مجاز نمی باشد")
      .max(250, "بیشتر از 250 حروف مجاز نمی باشد")
      .required("لطفا نشانی را وارد کنید"),
  });

  return (
    <div className="bg-white mx-44 w-4/5 mt-6 p-5 rounded-lg">
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          phoneNumber: "",
          address: "",
          deliveryDate: "",
        }}
        onSubmit={(values) => {
          const localStorageData = JSON.parse(
            localStorage.getItem("cartItems")
          );
          let totalPrice = 0;
          localStorageData.forEach((element) => {
            totalPrice += +element.quantity * +element.price;
          });
          const selectedItems = localStorageData.map((element) => {
            return {
              title: element.title,
              brand: element.brand,
              price: +element.price,
              count: +element.quantity,
            };
          });
          const orders = {
            customer: `${values.firstname} ${values.lastname}`,
            totalPrice: totalPrice,
            phoneNumber: values.phoneNumber,
            address: values.address,
            deliveredStatus: "pending",
            deliveredAt: !!deliveryDate && deliveryDate ? deliveryDate : "",
            selectedItems: selectedItems,
          };

          localStorage.setItem("Orders", JSON.stringify(orders));
          window.location.href = `http://localhost:3002/parsian_payment.html?customerName=${orders.customer}&totalPrice=${orders.totalPrice}`;
        }}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => {
          return (
            <form onSubmit={handleSubmit} className="my-3 mr-10">
              <div className="flex items-center">
                <div className="inline-flex flex-col w-80">
                  <label
                    htmlFor="firstname"
                    className="text-[1.1rem] font-semibold"
                  >
                    نام :
                  </label>
                  <Field
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="border border-gray-400 rounded-lg p-2 my-2 focus:border-2 focus:border-gray-400 focus:outline-none"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstname && touched.firstname && (
                    <p className="error text-red-600">{errors.firstname}</p>
                  )}
                </div>
                <div className="inline-flex flex-col w-80 mr-20">
                  <label
                    htmlFor="lastname"
                    className="text-[1.1rem] font-semibold"
                  >
                    نام خانوادگی :
                  </label>
                  <Field
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="border border-gray-400 rounded-lg p-2 my-2 focus:border-2 focus:border-gray-400 focus:outline-none"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastname && touched.lastname && (
                    <p className="error text-red-600">{errors.lastname}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="inline-flex flex-col w-80">
                  <label
                    htmlFor="deliveryDate"
                    className="text-[1.1rem] font-semibold"
                  >
                    تاریخ تحویل :
                  </label>
                  <div>
                    <DatePicker
                      render={<InputIcon />}
                      mapDays={({ date }) => {
                        let isWeekend = ["", 6].includes(date.weekDay.index);

                        if (isWeekend) {
                          return {
                            disabled: true,
                            style: { color: "yellow" },
                          };
                        }
                      }}
                      showOtherDays
                      className="bg-dark"
                      name="deliveryDate"
                      onChange={(e) => setDeliveryDate(e.unix * 1000)}
                      editable={false}
                      placeholder={"برای باز شدن تقویم کلیک کنید"}
                      rules={{ required: true }}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                    />
                  </div>
                </div>
                <div className="inline-flex flex-col w-80 mr-20">
                  <label
                    htmlFor="phoneNumber"
                    className="text-[1.1rem] font-semibold"
                  >
                    تلفن همراه :
                  </label>
                  <Field
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="border border-gray-400 rounded-lg p-2 my-2 focus:border-2 focus:border-gray-400 focus:outline-none"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <p className="error text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <div className="mt-5 inline-flex flex-col">
                <label
                  htmlFor="address"
                  className="text-[1.1rem] font-semibold"
                >
                  نشانی:
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="border border-gray-400 rounded-lg p-2 my-2 focus:border-2 focus:border-gray-400 focus:outline-none w-80 pb-28"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && (
                  <p className="error text-red-600">{errors.address}</p>
                )}
              </div>
              <div className="mr-80 mt-10">
                <button
                  type="submit"
                  className="bg-green-500 rounded-lg px-4 py-2 text-white"
                >
                  ورود به صفحه پرداخت
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export { FinalPayment };
