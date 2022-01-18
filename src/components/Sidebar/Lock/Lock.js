import React, { useState, createRef, useEffect } from "react";
import * as classes from "./Lock.module.css";

const Lock = () => {
  const [showLockModal, setShowLockModal] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pass, setPass] = useState(["", "", "", ""]);
  const inputRefArray = [createRef(), createRef(), createRef(), createRef()];

  useEffect(() => {
    if (showLockModal) {
      inputRefArray[0]?.current?.focus();
    }
  }, [showLockModal]);

  const handleUnlock = () => {
    if (
      pass.every(
        (el, idx) => parseInt(el) === parseInt(process.env.REACT_APP_PIN[idx])
      )
    ) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowLockModal(false);
        setShowSuccess(false);
      }, 300);
    } else {
      inputRefArray[0]?.current?.focus();
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000);
    }
    setPass(["", "", "", ""]);
  };

  const focusInput = (idx) => {
    inputRefArray[idx]?.current?.focus();
  };

  const handleBackspace = (idx) => {
    if (pass[idx] === "") {
      focusInput(idx - 1);
    } else {
      pass[idx] = "";
    }
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
    if (!isNaN(event.target.value)) {
      if (event.target.value !== "" && idx !== 3) {
        focusInput(idx + 1);
      }
    }
  };

  const lockModal = (
    <div className={classes.lockModalOuter}>
      <div className={classes.lockModal}>
        <div className={classes.lockModalPassword}>
          <input
            value={pass[0]}
            onChange={(e) => setPassUtil(e, 0)}
            className={`${classes.input} ${showError && classes.error} ${
              showSuccess && classes.success
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUnlock();
              }
            }}
            ref={inputRefArray[0]}
          />
          <input
            value={pass[1]}
            onChange={(e) => setPassUtil(e, 1)}
            className={`${classes.input} ${showError && classes.error} ${
              showSuccess && classes.success
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUnlock();
              } else if (e.key === "Backspace") {
                handleBackspace(1);
              }
            }}
            ref={inputRefArray[1]}
          />
          <input
            value={pass[2]}
            onChange={(e) => setPassUtil(e, 2)}
            className={`${classes.input} ${showError && classes.error} ${
              showSuccess && classes.success
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUnlock();
              } else if (e.key === "Backspace") {
                handleBackspace(2);
              }
            }}
            ref={inputRefArray[2]}
          />
          <input
            value={pass[3]}
            onChange={(e) => setPassUtil(e, 3)}
            className={`${classes.input} ${showError && classes.error} ${
              showSuccess && classes.success
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUnlock();
              } else if (e.key === "Backspace") {
                handleBackspace(3);
              }
            }}
            ref={inputRefArray[3]}
          />
        </div>
        <button
          onClick={handleUnlock}
          className={`${classes.unlockButton} ${showError && classes.error} ${
            showSuccess && classes.success
          }`}
        >
          {showError ? "Incorrect PIN" : showSuccess ? "Correct PIN" : "Unlock"}
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
