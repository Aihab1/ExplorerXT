import React, { useEffect } from "react";
import * as classes from "./Sidebar.module.css";
import Logo from "./Logo/Logo";
import Tree from "./Tree/Tree";
import Lock from "./Lock/Lock";

const Sidebar = () => {
  useEffect(() => {
    const sidebar = document.querySelector(`.${classes.sidebar}`);
    let startX, startWidth;
    const resizer = document.querySelector(`.${classes.resizer}`);

    function initDrag(e) {
      startX = e.clientX;
      startWidth = parseInt(sidebar.clientWidth, 10);
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }

    function doDrag(e) {
      if (sidebar) {
        sidebar.style.width = startWidth + e.clientX - startX + "px";
      }
    }

    function stopDrag(e) {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }

    resizer?.addEventListener("mousedown", initDrag, false);
  }, []);

  return (
    <div className={classes.sidebarOuter}>
      <div className={`${classes.sidebar}`}>
        <div className={classes.sidebarInner}>
          <Logo />
          <Tree />
        </div>
        <Lock />
      </div>
      <div className={classes.resizer}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
