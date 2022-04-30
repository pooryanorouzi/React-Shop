import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getProduct } from "redux/actions/products.action";
import { getCategory } from "redux/actions/category.action";
import { Cards } from "components";

function Categories(props) {
  const location = useLocation();
  const { categorylist, categoryItem } = useParams();
  const dispatch = useDispatch();
  const productsData = useSelector(
    (state) => state.productsState,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getProduct("all", "all"));
    dispatch(getCategory());
  }, [dispatch]);

  const getExactProds = productsData.products.filter(
    (element) => element.category === +categorylist
  );

  return (
    <div className="my-12 mx-44">
      <div className={"grid grid-cols-5 gap-x-14"}>
        <Cards links={getExactProds} path={location.pathname} />
      </div>
    </div>
  );
}

export { Categories };
