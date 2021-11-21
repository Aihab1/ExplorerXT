import React from "react";
import * as classes from "./Sidebar.module.css";
import Logo from "./Logo/Logo";
import Tree from "./Tree/Tree";
import Lock from "./Lock/Lock";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarInner}>
        <Logo />
        <Tree />
      </div>
      <Lock />
    </div>
  );
};

export default Sidebar;
