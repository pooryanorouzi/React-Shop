import PropTypes from "prop-types";

export const DEFAULT_PROPS = {
  links: [],
  title: "",
  images: [],
  className: {},
};

export const PROP_TYPES = {
  links: PropTypes.array,
  title: PropTypes.string,
  images: PropTypes.array,
  className: PropTypes.object,
};
