import React, { useState } from "react";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import * as classes from "./Explorer.module.css";
import Search from "./Search/Search";
import fileIcon from "../../assets/document.png";

import { activeDirectory, allDirectories } from "../Sidebar/Tree/Tree";

const Explorer = () => {
  const dirPathKeys = activeDirectory.path.split("/").slice(1);
  let activeDirectoryData = allDirectories;
  for (const k of dirPathKeys) {
    activeDirectoryData = activeDirectoryData.children[k];
  }
  const filesData = activeDirectoryData.children;
  let files = [];
  for (const file in filesData) {
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

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentFileKey, setCurrentFileKey] = useState("");
  const [currentFileData, setCurrentFileData] = useState("");

  const saveFile = () => {
    if(currentFileKey.length > 0 && filesData) {
      filesData[currentFileKey].data = currentFileData;
    }
    setShowEditModal(false);
  }

  const displayModal = (file, filesData) => {
    setCurrentFileKey(file);
    setCurrentFileData(filesData[file].data);
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
          <textarea value={currentFileData} onChange={e => setCurrentFileData(e.target.value)} />
        </div>
        <button onClick={saveFile}>
          Save file
        </button>
      </div>
    </div>
  );

  return (
    <div className={classes.explorer}>
      <div className={classes.explorerHeader}>
        <Breadcrumbs />
        <Search />
      </div>
      <div className={classes.explorerBody}>
        {files}
        {showEditModal && editModal}
      </div>
    </div>
  );
};

export default Explorer;
