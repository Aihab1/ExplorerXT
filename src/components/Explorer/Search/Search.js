import React, { useState } from "react";
import * as classes from "./Search.module.css";
import fileIcon from "../../../assets/document.png";
import folderIcon from "../../../assets/folder-closed.png";

const Search = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFileFolderModal, setShowFileFolderModal] = useState(false);
  const [isFile, setIsFile] = useState(true);

  const addFileFolderHandler = (fileOrFolder) => {
    if(fileOrFolder === "file") {
      setIsFile(true);
    } else {
      setIsFile(false);
    }
    setShowFileFolderModal(true);
    setShowAddModal(false);
  }

  const addModal = (
    <div className={classes.addModal}>
      <button onClick={() => addFileFolderHandler("file")}>File</button>
      <button onClick={() => addFileFolderHandler("folder")}>Folder</button>
    </div>
  );

  const fileFolderModal = (
    <div className={classes.fileFolderModalOuter}>
      <div
        className={classes.backdrop}
        onClick={() => setShowFileFolderModal(false)}
      ></div>
      <div className={classes.fileFolderModal}>
        <div className={classes.fileFolderInner}>
          <img src={isFile ? fileIcon : folderIcon} alt={`${isFile ? 'file' : 'folder'} icon`} />
          <input placeholder={`Enter ${isFile ? 'file' : 'folder'} name`}/>
        </div>
        <button>
          Create {`${isFile ? 'File' : 'Folder'}`}
        </button>
      </div>
    </div>
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchBar}>
        <input placeholder="Search.." />
        <svg className="svg-icon" viewBox="0 0 20 20">
          <path
            d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
								c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
								c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
								s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"
          ></path>
        </svg>
      </div>
      <div className={classes.addBar}>
        <button className={classes.addButton} onClick={() => setShowAddModal((prevState) => !prevState)}>
          +
        </button>
        {showAddModal && addModal}
      </div>
      {showFileFolderModal && fileFolderModal}
    </div>
  );
};

export default Search;
