import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProd } from "api/products.api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "redux/actions/cart.action";
import toast from "react-hot-toast";
import { AiFillCaretLeft } from "react-icons/ai";
import { PATHS } from "configs/routes.config";
import { getCategory } from "redux/actions/category.action";
import { Cards } from "components";
import { getProduct } from "redux/actions/products.action";

function Item(props) {
  const { productID, categorylist } = useParams();
  const [prod, setProd] = useState();
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const categoryData = useSelector((state) => state.categoryState.category);
  const productsData = useSelector((state) => state.productsState.products);

  useEffect(() => {
    getProd(productID).then((data) => setProd(data));
    dispatch(getCategory());
    dispatch(getProduct("all", "all"));
  }, [productID, dispatch]);

  const handleAddCounter = () => {
    setCounter(counter + 1);
  };

  const handleSubCounter = () => {
    setCounter(counter - 1);
  };

  const itemCategory = prod
    ? categoryData.find((prods) => prods.id === prod.category)
    : "";

  const listOfSimilarItems = productsData
    .filter((prods) => prods.category === itemCategory.id)
    .filter((items) => items.id !== +productID);

  const lastEightProducts =
    listOfSimilarItems.length > 8
      ? listOfSimilarItems.slice(
          listOfSimilarItems.length - 8,
          listOfSimilarItems.length - 1
        )
      : listOfSimilarItems;

  const handleAddToCart = (item) => {
    let data = { ...prod, quantity: counter };
    const existingItem = cartItems.filter((element) => element.id === data.id);
    cartItems.forEach((element) => console.log(element));
    if (
      cartItems.length > 0 &&
      existingItem.length > 0 &&
      data.id === existingItem[0].id
    ) {
      toast.error(
        `کالای ${data.title} ${data.brand} از قبل در لیست خرید موجود است`
      );
      return;
    } else {
      dispatch(addToCart(data));
      toast.success(`کالای ${data.title} ${data.brand} به سبد خرید اضافه شد`);
    }
  };

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      {!!prod && (
        <div className={"w-4/5 mx-44 mt-6"}>
          <div className={"bg-white rounded"}>
            <div className={"flex"}>
              <img
                src={`http://localhost:3002/files/${prod.thumbnail}`}
                alt=""
                className={"w-80 h-80"}
              />
              <div className={"mr-8 mt-10"}>
                <h1 className={"text-3xl mb-5"}>
                  {prod.title} {prod.brand}
                </h1>
                <Link
                  to={
                    prod ? `${PATHS.CATEGORY}/${prod.category}` : PATHS.CATEGORY
                  }
                  className={"text-gray-600 flex items-center"}
                >
                  <span>گروه {itemCategory ? itemCategory.name : ""}</span>
                  <span>
                    <AiFillCaretLeft />
                  </span>
                </Link>
                <p className={"mt-5 flex items-center"}>
                  <span className={"font-bold text-xl ml-1"}>
                    {numberWithCommas(prod.price)}
                  </span>
                  <span>تومان</span>
                </p>
                <button
                  type="button"
                  className="w-9 h-9 rounded-lg bg-rose-500 text-white"
                  onClick={() => handleAddCounter()}
                >
                  +
                </button>
                <input
                  type="text"
                  value={counter < 1 ? setCounter(1) : counter}
                  className="border mt-7 focus:outline-gray-300 w-16 py-1.5 rounded-lg px-2 text-center"
                />
                <button
                  type="button"
                  className="w-9 h-9 rounded-lg bg-rose-500 text-white"
                  onClick={() => handleSubCounter()}
                >
                  -
                </button>
                <br />
                <button
                  className={
                    "mt-5 -mr-1 bg-green-500 text-white px-4 py-2 rounded-lg "
                  }
                  onClick={() => handleAddToCart(prod)}
                >
                  افزودن به سبد خرید
                </button>
              </div>
              <div className={"border rounded p-4 w-72 h-28 mt-20 mr-72"}>
                <p className={"text-sm"}>ویژه اعضای سان پلاس</p>
                <p className={"text-xs mt-4 text-gray-500"}>ارسال رایگان</p>
                <p className={"text-xs mt-2 text-gray-500"}>
                  ارسال فوری به شهرهای اطراف تهران
                </p>
              </div>
            </div>
            <p className={"py-10 w-1/2 mr-28"}>{prod.description}</p>
          </div>
          <hr className="border-t-gray-300" />
          <div className="mt-5 p-5 rounded-lg">
            <p className="text-lg border-b-2 border-rose-600 w-32">
              محصولات مشابه
            </p>
            <div className="grid grid-cols-5 gap-x-5">
              {lastEightProducts.length > 0 ? (
                <Cards
                  links={lastEightProducts}
                  path={`${PATHS.CATEGORY}/${categorylist}`}
                />
              ) : (
                <h1 className="mt-10 w-96 text-lg font-semibold">
                  محصول مشابهی برای این نوع محصول وجود ندارد
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Item };
