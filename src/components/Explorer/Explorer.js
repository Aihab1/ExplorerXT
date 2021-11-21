import React, { useState } from "react";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import * as classes from "./Explorer.module.css";
import Search from "./Search/Search";
import fileIcon from "../../assets/document.png";
import { useSelector, useDispatch } from "react-redux";
import { updateFileData } from "../../actions/directory";

const Explorer = () => {
  const [search, setSearch] = useState("");
  const { activeDirectory, allDirectories } = useSelector((state) => state);
  const dispatch = useDispatch();

  const dirPathKeys = activeDirectory.path.split("/").slice(1);
  let activeDirectoryData = allDirectories;
  for (const k of dirPathKeys) {
    activeDirectoryData = activeDirectoryData.children[k];
  }
  const filesData = activeDirectoryData.children;
  let files = [];
  for (const file in filesData) {
    if (!filesData[file]?.leaf) {
      continue;
    }
    files.push(
      <button
        key={filesData[file]?.id}
        className={classes.file}
        onClick={() => displayModal(file, filesData)}
      >
        <img src={fileIcon} alt="file" />
        {file}
      </button>
    );
  }

  const findChildrenBySearch = (children) => {
    if (!children || Object.keys(children).length === 0) {
      return "";
    }
    let childrenFiles = [];
    for (let key in children) {
      let child = children[key];
      if (
        child.leaf &&
        (child.module.toLowerCase().includes(search.toLowerCase()) ||
          child.data.toLowerCase().includes(search.toLowerCase()))
      ) {
        childrenFiles.push(
          <button
            key={child.id}
            className={classes.file}
            onClick={() => displayModal(child.module, children)}
          >
            <img src={fileIcon} alt="file" />
            {child.module}
          </button>
        );
      } else {
        childrenFiles.push(findChildrenBySearch(child.children));
      }
    }
    return childrenFiles;
  };

  if (search.length > 0) {
    let activeDirectoryData = { ...allDirectories };
    for (const k of activeDirectory.path.split("/").slice(1)) {
      activeDirectoryData = activeDirectoryData.children[k];
    }
    files = findChildrenBySearch(activeDirectoryData.children);
  }

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentFileKey, setCurrentFileKey] = useState("");
  const [currentFileData, setCurrentFileData] = useState("");
  const [currentFileCompleteData, setCurrentFileCompleteData] = useState({});

  const saveFile = () => {
    if (currentFileKey.length > 0 && currentFileCompleteData)
      dispatch(
        updateFileData({
          data: currentFileData,
          path: currentFileCompleteData.path,
        })
      );

    setShowEditModal(false);
  };

  const displayModal = (file, filesData) => {
    setCurrentFileKey(file);
    setCurrentFileData(filesData[file].data);
    setCurrentFileCompleteData(filesData[file]);
    setShowEditModal(true);
  };

  const editModal = (
    <div className={classes.editModalOuter}>
      <div
        className={classes.backdrop}
        onClick={() => setShowEditModal(false)}
      ></div>
      <div className={classes.editModal}>
        <div className={classes.editModalTitle}>
          <img src={fileIcon} alt="file icon" />
          <h1>{currentFileKey}</h1>
        </div>
        <div className={classes.editModalContent}>
          <textarea
            value={currentFileData}
            onChange={(e) => setCurrentFileData(e.target.value)}
          />
        </div>
        <button onClick={saveFile}>Save file</button>
      </div>
    </div>
  );

  return (
    <div className={classes.explorer}>
      <div className={classes.explorerHeader}>
        <Breadcrumbs />
        <Search setSearch={setSearch} />
      </div>
      <div className={classes.explorerBody}>
        {files}
        {showEditModal && editModal}
      </div>
    </div>
  );
};

export default Explorer;
