import React, { useEffect } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import Images from "assets";
import { Slider } from "components/Carousel/Carousel.component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PATHS } from "configs/routes.config";
import { Link } from "react-router-dom";
import * as pages from "pages";
import { Cards, Categories } from "components";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "redux/actions/products.action";
import { getCategory } from "redux/actions/category.action";

function Home(props) {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.productsState.products);
  const categoryData = useSelector((state) => state.categoryState.category);

  useEffect(() => {
    dispatch(getProduct("all", "all"));
    dispatch(getCategory());
  }, [dispatch]);

  const filterProducts = (id) => {
    const getProds = productsData.filter((items) => items.category === id);
    const slicedProds =
      getProds.length > 3
        ? getProds.slice(getProds.length - 5, getProds.length)
        : getProds;
    return slicedProds;
  };

  const images = [
    Images.CarouselImage1,
    Images.CarouselImage2,
    Images.CarouselImage3,
    Images.CarouselImage4,
  ];
  return (
    <div className={""}>
      {/*Carousel*/}
      <div
        className={
          "w-4/5  h-80 rounded-lg mx-44 mt-6 flex items-center justify-center text-lg"
        }
      >
        <Slider slides={images} />
      </div>
      {/*Carousel*/}
      {/*Post Code*/}
      <div className="postCode w-4/5 bg-gray-200 flex items-center py-10 mt-8 mx-44 px-7 rounded-lg">
        <img src={Images.Car} alt="Car" className={"w-28 ml-2"} />
        <div>
          <span className={"text-red-500"}>تحویل رایگان </span>
          <span className={"text-blue-900"}>در روز بعد</span>
          <p> تحویل سریع و به موقع </p>
        </div>
        <p className={"mx-40"}>بررسی کن آیا میتونم تحویل بدم یا نه</p>
        <div className={"rounded-lg w-96 px-4 bg-white py-2 flex items-center"}>
          <input
            type="text"
            placeholder={"کد پستیتو وارد کن"}
            className={"focus:outline-none text-gray-600"}
          />
          <button className={"mr-12"}>
            <MdOutlineMyLocation />
          </button>
          <button
            className={"rounded-lg text-white bg-green-500 mr-3 px-3 py-2"}
          >
            چک کن
          </button>
        </div>
      </div>
      {/*Post Code*/}
      {/* Category */}
      <div className={"w-4/5 mx-44 mt-9"}>
        <div className={"flex justify-between items-center "}>
          <p className={"text-2xl font-semibold overflow-hidden"}>
            دسته بندی ها
          </p>
          <Link to={PATHS.CATEGORY} className={"text-red-600 font-medium"}>
            مشاهده همه محصولات
          </Link>
        </div>
        <div className={"flex items-center mt-10"}>
          <Categories links={categoryData} />
        </div>
      </div>
      {/* Category */}
      {/* Ads */}
      <div className="flex w-4/5 mx-44 mt-12">
        <div className="rounded-lg w-1/2  h-80">
          <img
            src={Images.Ads1}
            alt="Ads1"
            className={"h-80 rounded-lg w-full"}
          />
        </div>
        <div className={"rounded-lg w-1/2  h-80 mr-2"}>
          <img src={Images.Ads2} alt="Ads2" className={"h-80 rounded-lg"} />
        </div>
      </div>
      {/* Ads */}
      {/* Popular */}
      <div className={"w-4/5 mt-10 mx-44"}>
        <div className={"flex justify-between items-center "}>
          <p className={"text-2xl font-semibold overflow-hidden"}>
            محصولات پرطرفدار
          </p>
          <Link
            to={PATHS.POPULAR}
            element={pages.Popular}
            className={"text-red-600 font-medium"}
          >
            مشاهده همه محصولات
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-x-6">
          <Cards links={filterProducts(1)} path={`${PATHS.CATEGORY}/1`} />
        </div>
      </div>
      {/* Popular */}
    </div>
  );
}

export { Home };
