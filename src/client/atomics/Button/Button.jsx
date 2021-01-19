import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.styles";

const useStyles = createUseStyles(styles);

const Button = ({ icon, content, className, title, style, type, action }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <button
      type={type}
      className={classNames(className, {
        [classes.button]: !icon,
        [classes.iconButton]: icon,
      })}
      title={title}
      onClick={action}
      style={style}
    >
      {icon}
      {content}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  action: () => {},
};

export default Button;
