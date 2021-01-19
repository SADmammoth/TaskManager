import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTheme, createUseStyles } from "react-jss";
import styles from "./Stack.styles";

const useStyles = createUseStyles(styles);

function Stack({ orientation, children }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const isVertical = orientation === "vertical";

  return (
    <div
      className={classNames({
        [classes.vertical]: isVertical,
        [classes.horizontal]: !isVertical,
      })}
    >
      {children}
    </div>
  );
}

Stack.propTypes = {
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

Stack.defaultProps = {
  orientation: "horizontal",
};

export default Stack;
