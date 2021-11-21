import {
  CD,
  UPDATE_FILE_DATA,
  ADD_FILE,
  ADD_FOLDER,
} from "../constants/actionTypes";

export const changeDirectory =
  ({ path }) =>
  (dispatch) => {
    try {
      dispatch({ type: CD, payload: path });
    } catch (error) {
      console.log(error);
    }
  };

export const updateFileData =
  ({ data, path }) =>
  (dispatch) => {
    try {
      dispatch({ type: UPDATE_FILE_DATA, payload: { data, path } });
    } catch (error) {
      console.log(error);
    }
  };

export const addFile =
  ({ path, fileName }) =>
  (dispatch) => {
    try {
      dispatch({ type: ADD_FILE, payload: { path, fileName } });
    } catch (error) {
      console.log(error);
    }
  };

export const addFolder =
  ({ path, folderName }) =>
  (dispatch) => {
    try {
      dispatch({ type: ADD_FOLDER, payload: { path, folderName } });
    } catch (error) {
      console.log(error);
    }
  };
