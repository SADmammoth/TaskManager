import React from "react";
import PropTypes from "prop-types";

const useStyles = createUseStyles(styles);

function Link({ href, children }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <a href={href} className={classes.root}>
      {children}
    </a>
  );
}

Link.propTypes = {
  href: PropTypes.string,
};

Link.defaultProps = {
  href: "#",
};

export default Link;
