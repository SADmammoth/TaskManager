import React from "react";
import PropTypes from "prop-types";
import Stack from "../../atomics/Stack";

import { useTheme, createUseStyles } from "react-jss";
import styles from "./Sidebar.styles";

const useStyles = createUseStyles(styles);

function Sidebar({ className, menus, content }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <aside className={classes.root}>
        <Stack>
          {menus || (
            <Stack orientation="vertical" className={classes.menus}>
              {menus}
            </Stack>
          )}
          <Stack orientation="vertical" className={classes.content}>
            {content}
          </Stack>
        </Stack>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  menus: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  ),
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Sidebar;
