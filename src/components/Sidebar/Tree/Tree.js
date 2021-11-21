import React from "react";
import * as classes from "./Tree.module.css";
import folderCollapsed from "../../../assets/folder-closed.png";
import folderOpen from "../../../assets/folder-open.png";

export const activeDirectory = {
  path: "/Instruments/Fender/Electric%Guitar",
}

export const allDirectories = {
  module: "Root",
  id: "root-0",
  path: "/",
  collapsed: false,
  children: {
    Instruments: {
      id: "root-1",
      module: "Instruments",
      path: "/Instruments",
      collapsed: false,
      children: {
        Fender: {
          id: "root-2",
          module: "Fender",
          path: "/Instruments/Fender",
          collapsed: false,
          children: {
            "Acoustic%Guitar":{
              id: "root-3",
              module: "Acoustic Guitar",
              path: "/Instruments/Fender/Acoustic%Guitar",
              collapsed: true,
              children: {},
            },
            "Electric%Guitar": {
              id: "root-4",
              module: "Electric Guitar",
              path: "/Instruments/Fender/Electric%Guitar",
              collapsed: true,
              children: {
                White: {
                  id: "1",
                  module: "White",
                  path: "/Instruments/Fender/Electric%Guitar/White",
                  leaf: true,
                  data: "This is a white file.",
                },
                Black: {
                  id: "2",
                  module: "Black",
                  path: "/Instruments/Fender/Electric%Guitar/Black",
                  leaf: true,
                  data: "This is a black file.",
                },
                Wooden: {
                  id: "3",
                  module: "Wooden",
                  path: "/Instruments/Fender/Electric%Guitar/Wooden",
                  leaf: true,
                  data: "This is a wooden file.",
                },
              },
            },
          },
        },
        Yamaha: {
          module: "Yamaha",
          id: "root-5",
          collapsed: true,
          children: {},
        },
      },
    },
    Songs: {
      id: "root-6",
      module: "Songs",
      path: "/Songs",
      collapsed: true,
      children: {},
    },
  },
};

const findChildren = (children) => {
  if (Object.keys(children).length === 0) {
    return "";
  }
  let childrenTree = [];
  for (let key in children) {
    let child = children[key];
    if (child.leaf) {
      childrenTree.push(
        <div className={classes.dirOuter} key={child.id}>
          {child.module}
        </div>
      );
    } else {
      childrenTree.push(
        <div key={child.id}>
          <div className={`${classes.dirOuter} ${child.path === activeDirectory.path && classes.active}`}>
            <img src={`${child.collapsed ? folderCollapsed : folderOpen}`} alt={`folder ${child.collapsed ? 'closed' : 'opened'}`}/>
            {child.module}
          </div>
          {!child.collapsed && (
            <div style={{ marginLeft: "25px" }}>
              {findChildren(child.children)}
            </div>
          )}
        </div>
      );
    }
  }
  return childrenTree;
};

const Tree = () => {
  const tree = findChildren(allDirectories.children);
  return <div className={classes.tree}>{tree}</div>;
};

export default Tree;
