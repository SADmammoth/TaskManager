import React from "react";
import PropTypes from "prop-types";

const useStyles = createUseStyles(styles);

function Text({ variant, children, className }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const Tag = React.createElement(variant);
  return (
    <Tag className={classNames(className, classes[variant])}>{children}</Tag>
  );
}

Text.propTypes = {
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "p", "span"]),
};

export default Text;
