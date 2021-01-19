import React from "react";
import { useTheme, createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import styles from "../../components/Header/Header.styles";
import Stack from "../Stack";
import Link from "../Link";

const useStyles = createUseStyles(styles);

function Nav({ items }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <nav className={classes.root}>
      <Stack>
        {Object.entries(items).map(([name, path]) => (
          <Link key={path} className={classes.navItem} to={path}>
            {name}
          </Link>
        ))}
      </Stack>
    </nav>
  );
}

Nav.propTypes = {
  items: PropTypes.objectOf(PropTypes.string),
};

export default Nav;
