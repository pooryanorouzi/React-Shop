import { PATHS } from "configs/routes.config";
import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_PROPS, PROP_TYPES } from "./Categories.config";

function Categories(props) {
  const { links } = props;
  links.forEach((items) => {
    console.log(items.icon);
  });
  return (
    <React.Fragment>
      {links.length > 0 &&
        links.map((link) => (
          <Link
            to={`${PATHS.CATEGORY}/${link.id}`}
            className={"overflow-hidden flex flex-col items-center"}
          >
            <img
              src={`http://localhost:3002/files/${link.icon}`}
              alt={link.name}
              className={"w-24 mx-16"}
            />
            <figcaption className={"mt-5 overflow-hidden"}>
              {link.name}
            </figcaption>
          </Link>
        ))}
    </React.Fragment>
  );
}

Categories.defaultProps = DEFAULT_PROPS;
Categories.propTypes = PROP_TYPES;

export { Categories };
