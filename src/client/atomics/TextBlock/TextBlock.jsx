import React from "react";
import PropTypes from "prop-types";
import { useTheme, createUseStyles } from "react-jss";
import classNames from "classnames";
import styles from "./TextBlock.styles";

const useStyles = createUseStyles(styles);

function TextBlock({ variant, children, className }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const Tag = variant;
  return (
    <Tag className={classNames(className, classes[variant])}>{children}</Tag>
  );
}

TextBlock.propTypes = {
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "p", "span"]),
};

export default TextBlock;
