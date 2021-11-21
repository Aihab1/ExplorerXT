import React from "react";
import * as classes from "./Breadcrumbs.module.css";

import { activeDirectory } from "../../Sidebar/Tree/Tree";

const Breadcrumbs = () => {
  let paths = activeDirectory.path.split("/");
  return (
    <div className={classes.breadcrumbs}>
      {paths.map((path, index) => {
        if (!path) {
          return null;
        } else if (index === 1) {
          return (
            <div
              key={`${path}_${index}`}
              style={{ display: "flex", alignItems: "center", height: '25px' }}
            >
              <button>{path.split("%").join(" ")}</button>
            </div>
          );
        }
        return (
          <div
            key={`${path}_${index}`}
            style={{ display: "flex", alignItems: "center", height: '25px' }}
          >
            <div className={classes.slash}>/</div>
            <button>{path.split("%").join(" ")}</button>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
