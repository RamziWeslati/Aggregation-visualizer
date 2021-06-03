import React from "react";
import PropTypes from "prop-types";

import {makeStyles, Toolbar, AppBar } from "@material-ui/core";

const ApplicationBar = ({ logo, alt }) => {
  /**Presentational component that renders application bar
   * 
   * @props
   * - logo: string
   *      uri to logo image to display
   * - alt [optional]: string
   *      alt text passed to img tag, defualted to `Website Logo`
   */
  const classes = useStyles()
  return (
  <AppBar>
    <Toolbar className={classes.toolbar}>
      <img src={logo} alt={alt} className={classes.img} />
    </Toolbar>
  </AppBar>
);
  }

ApplicationBar.propTypes = {
  logo: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

ApplicationBar.defaultProps = {
  alt: "Website Logo",
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#000",
  },
  img: {
    width: '110px'
  }
}));

export default ApplicationBar;
