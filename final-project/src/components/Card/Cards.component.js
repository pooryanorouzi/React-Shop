import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { DEFAULT_PROPS, PROP_TYPES } from "./Cards.config";
// import { getProd } from "api/products.api";

function Cards(props) {
  const { links, path } = props;
  const { productID, categorylist } = useParams();
  const params = useParams();
  const location = useLocation();

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <React.Fragment>
      {links.length > 0 &&
        links.map((link) => (
          <Link to={`${path}/${link.id}`} className={"mt-6"} key={link.key}>
            <div
              className={
                "w-56 h-72 bg-white border border-gray-300 hover:shadow-xl px-5 rounded"
              }
            >
              <img
                src={`http://localhost:3002/files/${link.thumbnail}`}
                alt=""
                className={"w-44  mt-2"}
              />
              <p className={"mt-3"}> {`${link.title} ${link.brand}`} </p>
              <p className={"mt-2"}>موجود در انبار</p>
              <p className={"mt-2"}>{numberWithCommas(link.price)} تومان</p>
            </div>
          </Link>
        ))}
    </React.Fragment>
  );
}

Cards.defaultProps = DEFAULT_PROPS;
Cards.propTypes = PROP_TYPES;

export { Cards };
