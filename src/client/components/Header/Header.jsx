import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "../Nav";
import Clock from "../Clock";
import textVariants from "../Text/textVariants";

const useStyles = createUseStyles(styles);

function Header({ location }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <header>
        <div className={classes.logo}>
          <img src="" alt="" title="" />
        </div>
        <Text variant={textVariants.p} className={classes.siteName}>
          TaskManager
        </Text>
        <Nav
          items={{
            Main: "/",
            "Add Task": "/add",
            "New List": "/list",
            Login: "/login",
          }}
        ></Nav>
        {location && location.pathname !== "/404-error-page" ? <Clock /> : ""}
      </header>
    </>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    location: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);
