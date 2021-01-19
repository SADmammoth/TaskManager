import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = createUseStyles(styles);

function Nav({ items }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <nav className={classes.root}>
      <ul>
        {Object.entries(items).map(([name, path]) => (
          <li className={classes.navItem} key={path}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  items: PropTypes.objectOf(PropTypes.string),
};

export default Nav;
