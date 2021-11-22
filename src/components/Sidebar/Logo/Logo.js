import React from "react";
import logo from "../../../assets/logo.png";
import * as classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes.logo}>
      <img src={logo} alt="logo" />
      <h1>ExplorerXT</h1>
    </div>
  );
};

export default Logo;
