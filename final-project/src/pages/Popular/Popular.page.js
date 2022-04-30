import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "redux/actions/products.action";
import { useParams } from "react-router-dom";
import { Cards } from "components";
import { PATHS } from "configs/routes.config";
import { getCategory } from "redux/actions/category.action";
import ReactPaginate from "react-paginate";

function Popular(props) {
  // const [page, setPage] = useState(1);
  // const { productID } = useParams();
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.productsState);
  const productsList = productsData.products;
  // const totalLength = productsData.total / 10;

  // console.log("popular page productList: ", productsList);

  useEffect(() => {
    dispatch(getProduct("all", "all"));
    dispatch(getCategory());
  }, [dispatch]);

  // const handleClickPage = (data) => {
  //   let currentPage = data.selected + 1;
  //   setPage(currentPage);
  // };

  return (
    <div className={"mx-44 w-4/5 mt-6 "}>
      <div className="grid grid-cols-5 gap-7">
        <Cards links={productsList} path={PATHS.POPULAR} />
        {productsList.length > 0 &&
          productsList.map((product) => <Cards links={product} />)}
      </div>
      {/* <ReactPaginate
        onPageChange={handleClickPage}
        pageCount={totalLength / 1}
        nextLabel={""}
        previousLabel={""}
        renderOnZeroPageCount={null}
        containerClassName={"flex items-center justify-center mt-10"}
        pageClassName={"pt-1 px-2 mx-1 border border-sky-500 rounded-[50%]"}
      /> */}
    </div>
  );
}

export { Popular };
