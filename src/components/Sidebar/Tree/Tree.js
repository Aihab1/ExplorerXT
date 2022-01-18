import React from "react";
import * as classes from "./Tree.module.css";
import folderCollapsed from "../../../assets/folder-closed.png";
import folderOpen from "../../../assets/folder-open.png";
import { useSelector, useDispatch } from "react-redux";
import { changeDirectory } from "../../../actions/directory";

const Tree = () => {
  const { activeDirectory, allDirectories } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeActiveDirectoryHandler = (child) => {
    dispatch(changeDirectory({ path: child.path }));
  };

  const findChildren = (children) => {
    if (Object.keys(children).length === 0) {
      return "";
    }
    let childrenTree = [];
    for (let key in children) {
      let child = children[key];
      if (child.leaf) {
        continue;
      } else {
        childrenTree.push(
          <div key={child.id}>
            <div
              className={`${classes.dirOuter} ${
                child.path === activeDirectory.path && classes.active
              }`}
              onClick={() => changeActiveDirectoryHandler(child)}
            >
              <img
                src={`${child.collapsed ? folderCollapsed : folderOpen}`}
                alt={`folder ${child.collapsed ? "closed" : "opened"}`}
              />
              {child.module}
            </div>
            {!child.collapsed && (
              <div className={classes.childDivs}>
                {findChildren(child.children)}
              </div>
            )}
          </div>
        );
      }
    }
    return childrenTree;
  };
  const tree = findChildren(allDirectories.children);
  return <div className={classes.tree}>{tree}</div>;
};

export default Tree;
