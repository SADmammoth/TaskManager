import React from "react";
import PropTypes from "prop-types";
import { useTheme, createUseStyles } from "react-jss";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Link.styles";

const useStyles = createUseStyles(styles);

function Link({ href, children }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <RouterLink to={href} className={classes.root}>
      {children}
    </RouterLink>
  );
}

Link.propTypes = {
  href: PropTypes.string,
};

Link.defaultProps = {
  href: "#",
};

export default Link;
