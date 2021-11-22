import React, { useState } from "react";
import * as classes from "./Lock.module.css";

const Lock = () => {
  const [showLockModal, setShowLockModal] = useState(true);
  const [showError, setShowError] = useState(false);
  const [pass, setPass] = useState(["", "", "", ""]);

  const handleUnlock = () => {
    if (pass.every((el, idx) => parseInt(el) === parseInt(process.env.REACT_APP_PIN[idx]))) {
      setShowLockModal(false);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000);
    }
    setPass(["", "", "", ""]);
  };

  const setPassUtil = (event, idx) => {
    setPass(
      pass.map((p, i) =>
        i === idx
          ? isNaN(event.target.value) || event.target.value === ""
            ? ""
            : event.target.value % 10
          : p
      )
    );
  };

  const lockModal = (
    <div className={classes.lockModalOuter}>
      <div className={classes.lockModal}>
        <div className={classes.lockModalPassword}>
          <input
            value={pass[0]}
            onChange={(e) => setPassUtil(e, 0)}
            className={`${classes.input} ${showError && classes.error}`}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                handleUnlock();
              }
            }}
          ></input>
          <input
            value={pass[1]}
            onChange={(e) => setPassUtil(e, 1)}
            className={`${classes.input} ${showError && classes.error}`}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                handleUnlock();
              }
            }}
          ></input>
          <input
            value={pass[2]}
            onChange={(e) => setPassUtil(e, 2)}
            className={`${classes.input} ${showError && classes.error}`}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                handleUnlock();
              }
            }}
          ></input>
          <input
            value={pass[3]}
            onChange={(e) => setPassUtil(e, 3)}
            className={`${classes.input} ${showError && classes.error}`}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                handleUnlock();
              }
            }}
          ></input>
        </div>
        <button
          onClick={handleUnlock}
          className={`${classes.unlockButton} ${showError && classes.error}`}
        >
          {showError ? "Incorrect PIN" : "Unlock"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className={classes.lock}>
        <button onClick={() => setShowLockModal(true)}>Lock</button>
      </div>
      {showLockModal && lockModal}
    </>
  );
};

export default Lock;
