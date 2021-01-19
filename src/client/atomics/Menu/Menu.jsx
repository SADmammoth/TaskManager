import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const useStyles = createUseStyles(styles);

const Menu = ({ vertical, className, buttons }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const stackOrientation = vertical ? "vertical" : "horizontal";

  return (
    <nav className={classNames(className, classes.root)}>
      <Stack orientation={stackOrientation}>
        {buttons.map(({ key, ...attributes }) => (
          <Button key={key} className={classes.menuItem} {...attributes} />
        ))}
      </Stack>
    </nav>
  );
};

Menu.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, ...Button.propTypes })
  ).isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

export default Menu;
