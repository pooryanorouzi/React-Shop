import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { PATHS } from "configs/routes.config";
import { Cards } from "components";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getProduct } from "redux/actions/products.action";
import { getCategory } from "redux/actions/category.action";

const Category = () => {
  const [itemCategory, setItemCategory] = useState();
  const dispatch = useDispatch();
  const productsData = useSelector(
    (state) => state.productsState,
    shallowEqual
  );
  const categoryData = useSelector((state) => state.categoryState.category);
  const productsList = productsData.products;

  useEffect(() => {
    dispatch(getProduct("all", "all"));
    dispatch(getCategory());
  }, [dispatch]);

  const filterProducts = (id) => {
    const getProds = productsList.filter((items) => items.category === id);
    const slicedProds =
      getProds.length > 3
        ? getProds.slice(getProds.length - 3, getProds.length)
        : getProds;
    return slicedProds;
  };

  return (
    <div className={"w-4/5 mx-44 mt-10"}>
      <div className={"mt-16"}>
        <div className="flex">
          <div>
            {categoryData.map((category) => (
              <div className="mt-10">
                <Link
                  to={category.id.toString()}
                  className={"text-gray-600 flex items-center text-xl"}
                  key={category.id}
                >
                  کالاهای {category.name}
                  <span className="mt-1">
                    <AiFillCaretLeft />
                  </span>
                </Link>
                <div className="grid grid-cols-3 gap-x-10">
                  <Cards
                    links={filterProducts(category.id)}
                    path={`${PATHS.CATEGORY}/${category.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Category };
