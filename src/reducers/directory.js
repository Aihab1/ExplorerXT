import { ADD_FILE, ADD_FOLDER, CD, UPDATE_FILE_DATA } from "../constants/actionTypes";

const initialState = {
  activeDirectory: {
    path: "/Instruments/Fender/Electric%Guitar",
  },
  allDirectories: {
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
              "Acoustic%Guitar": {
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
                collapsed: false,
                children: {
                  "Electric%Folder": {
                    id: "root-7",
                    module: "Electric Folder",
                    path: "/Instruments/Fender/Electric%Guitar/Electric%Folder",
                    collapsed: true,
                    children: {},
                  },
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
            path: "/Instruments/Yamaha",
            id: "root-5",
            collapsed: false,
            children: {
              Bike: {
                id: "4",
                module: "Bike",
                path: "/Instruments/Yamaha/Bike",
                leaf: true,
                data: "This is a yamaha bike.",
              },
            },
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
  },
};

const directoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CD: {
      const path = action.payload;
      const updatedAllDirectories = { ...state.allDirectories };
      let activeDirectoryData = updatedAllDirectories;
      for (const k of path.split("/").slice(1)) {
        activeDirectoryData = activeDirectoryData.children[k];
      }
      activeDirectoryData.collapsed = !activeDirectoryData.collapsed;
      return {
        ...state,
        activeDirectory: { path: action.payload },
        allDirectories: updatedAllDirectories,
      };
    }
    case UPDATE_FILE_DATA: {
      const { path, data } = action.payload;
      const updatedAllDirectories = { ...state.allDirectories };
      let activeDirectoryData = updatedAllDirectories;
      for (const k of path.split("/").slice(1)) {
        activeDirectoryData = activeDirectoryData.children[k];
      }
      activeDirectoryData.data = data;
      return {
        ...state,
        allDirectories: updatedAllDirectories,
      };
    }
    case ADD_FILE: {
      let { path, fileName } = action.payload;
      const updatedAllDirectories = { ...state.allDirectories };
      let activeDirectoryData = updatedAllDirectories;
      for (const k of path.split("/").slice(1)) {
        activeDirectoryData = activeDirectoryData.children[k];
      }

      let count = 1;
      while (activeDirectoryData.children[fileName] && activeDirectoryData.children[fileName].module === fileName) {
        if(count === 1) {
          fileName = `${fileName} (${count})`;
        } else {
          fileName = `${fileName.slice(0, -3)} (${count})`;
        }
        count++;
      }
      activeDirectoryData.children[fileName] = {
        id: `${activeDirectoryData.id}-${
          Object.keys(activeDirectoryData.children).length
        }`,
        module: fileName,
        path: `${path}/${fileName}`,
        leaf: true,
        data: "",
      };
      return {
        ...state,
        allDirectories: updatedAllDirectories,
      };
    }
    case ADD_FOLDER: {
      let { path, folderName } = action.payload;
      const updatedAllDirectories = { ...state.allDirectories };
      let activeDirectoryData = updatedAllDirectories;
      for (const k of path.split("/").slice(1)) {
        activeDirectoryData = activeDirectoryData.children[k];
      }

      let count = 1;
      while (activeDirectoryData.children[folderName] && activeDirectoryData.children[folderName].module === folderName) {
        if(count === 1) {
          folderName = `${folderName} (${count})`;
        } else {
          folderName = `${folderName.slice(0, -3)} (${count})`;
        }
        count++;
      }

      activeDirectoryData.children[folderName] = {
        id: `${folderName}-${activeDirectoryData.id}`,
        module: folderName,
        path: `${path}/${folderName}`,
        collapsed: false,
        children: {},
      }
      return {
        ...state,
        allDirectories: updatedAllDirectories,
        activeDirectory: {
          path: `${path}/${folderName}`,
        }
      }
    }
    default:
      return state;
  }
};

export default directoryReducer;
