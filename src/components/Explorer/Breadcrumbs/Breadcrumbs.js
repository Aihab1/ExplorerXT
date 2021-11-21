import React from "react";
import * as classes from "./Breadcrumbs.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changeDirectory } from "../../../actions/directory";

const Breadcrumbs = () => {
  const { activeDirectory} = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeActiveDirectoryHandler = (paths, index) => {
    dispatch(changeDirectory({path: paths.slice(0, index + 1).join("/")}));
  };

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
              <button onClick={() => changeActiveDirectoryHandler(paths, index)}>{path.split("%").join(" ")}</button>
            </div>
          );
        }
        return (
          <div
            key={`${path}_${index}`}
            style={{ display: "flex", alignItems: "center", height: '25px' }}
          >
            <div className={classes.slash}>/</div>
            <button onClick={() => changeActiveDirectoryHandler(paths, index)}>{path.split("%").join(" ")}</button>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
