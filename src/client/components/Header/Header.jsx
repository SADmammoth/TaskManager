import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "../../atomics/Nav";
import Clock from "../../atomics/Clock";
import textVariants from "../../atomics/TextBlock/textVariants";
import { useTheme, createUseStyles } from "react-jss";
import styles from "./Header.styles";
import TextBlock from "../../atomics/TextBlock/TextBlock";

const useStyles = createUseStyles(styles);

function Header({ location }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <header className={classes.root}>
        <div className={classes.logo}>
          <img src="" alt="" title="" />
        </div>
        <TextBlock variant={textVariants.p} className={classes.siteName}>
          TaskManager
        </TextBlock>
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
