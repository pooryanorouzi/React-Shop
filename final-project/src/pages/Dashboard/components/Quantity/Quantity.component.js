import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, editProductAction } from "redux/actions/products.action";
import EditableLabel from "react-inline-editing";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";

function Quantity() {
  const [page, setPage] = useState(1);
  const [priceItem, setPriceItem] = useState([]);
  const [quantityItem, setQuantityItem] = useState([]);
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.productsState);
  const totalLength = productsData.total / 10;
  const productsList = productsData.products;

  const toastSuccess = () => {
    toast.success("اجناس با موفقیت به روز شدند", {
      className: "rounded-lg text-lg",
    });
  };

  const toastFailed = () => {
    toast.error("به روزرسانی اجناس موفقیت آمیز نبود");
  };

  useEffect(() => {
    dispatch(getProduct(page, 10));
  }, [dispatch, page]);

  const handleClickPage = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };

  const handlePriceItem = async (item, newPrice) => {
    let items = { id: item.id, price: newPrice };
    setPriceItem([...priceItem, items]);
  };

  const handleQuantityItem = async (item, newCount) => {
    let items = { id: item.id, count: newCount };
    setQuantityItem([...quantityItem, items]);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      quantityItem.forEach((item) => {
        dispatch(editProductAction(item.id, { count: item.count }));
        console.log(item);
      });
      priceItem.forEach((item) => {
        dispatch(editProductAction(item.id, { price: item.price }));
        console.log(item);
      });
      toastSuccess();
      setPriceItem([]);
      setQuantityItem([]);
    } catch (error) {
      console.log(error);
      toastFailed();
    }
  };

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className={"mx-44"}>
      <div className={"flex items-center justify-between"}>
        <h1 className={"text-2xl font-semibold overflow-hidden"}>
          مدیریت موجودی و قیمت ها
        </h1>
        <button
          className={
            priceItem.length || quantityItem.length
              ? "bg-sky-500 border rounded-lg px-4 py-2 text-white"
              : "bg-gray-500 rounded-lg px-4 py-2 text-white disabled"
          }
          onClick={
            priceItem.length || quantityItem.length
              ? (item) => updateItem(item)
              : ""
          }
        >
          ذخیره
        </button>
      </div>

      <table
        className={"border mt-8 rounded-xl w-full shadow-2xl border-collapse"}
      >
        <thead className={"bg-gray-300"}>
          <tr>
            <td className={"w-[48%] border py-2 pr-5"}>کالا</td>
            <td className={"border pr-4"}>قیمت</td>
            <td className={"border pr-3 text-right"}>موجودی</td>
          </tr>
        </thead>
        <tbody>
          {!!productsList.length &&
            productsList.map((item) => (
              <tr className={""} key={item.id}>
                <td className={"py-2 border border-gray-300 pr-5"}>
                  {`${item.title} ${item.brand}`}
                </td>
                <td className={"py-2 border border-gray-300 pr-5"}>
                  <EditableLabel
                    id={item.id}
                    onFocusOut={(e) => handlePriceItem(item, e)}
                    text={numberWithCommas(item.price)}
                  />
                </td>
                <td
                  className={
                    "py-2 border border-gray-300 focus:outline-none focus:bg-rose-300 pr-5"
                  }
                >
                  <EditableLabel
                    text={numberWithCommas(item.count)}
                    id={item.id}
                    labelFontWeight="bold"
                    inputFontWeight="bold"
                    onFocusOut={(e) => handleQuantityItem(item, e)}
                    inputWidth="100px"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        onPageChange={handleClickPage}
        pageCount={totalLength / 1}
        nextLabel={""}
        previousLabel={""}
        renderOnZeroPageCount={null}
        containerClassName={
          "flex items-center justify-center pt-12 w-96 m-auto"
        }
        pageClassName={"pt-1 px-2 mx-1 border border-sky-500 rounded-[50%]"}
      />
    </div>
  );
}

export { Quantity };
