
<h1 align="center">
  <a href="https://explorerxt.netlify.app/">
    ExplorerXT
  </a>
</h1>
<p align="center">By Aihab</p>

<p align="center">
  ExplorerXT is an online text file manager. It's a single-user application accessible with a 4 digit pin.
</p>
<p align="center">
  <strong><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /></strong>
</p>
    
![image](https://user-images.githubusercontent.com/55903466/142914415-704611b6-2de4-4e89-9055-e6d253cd6576.png)

> The PIN for the deployed website (demo) is 7777. Siiiuuuuuu.

## 🗂 Project Breakdown

### 1. React Client - Frontend

#### Description:
- In the left sidebar, there is a directory tree that expands all the folders inside on folder click and shows files stored in that folder on the right.
- There are clickable breadcrumbs on top, which show the current folder path.
- A new file/folder can be created in the selected folder by clicking the plus button on the top right.
- Plus button click opens a dropdown showing option to create a file or folder. After selecting file/folder a dialog pops-up.
- Clicking the file opens a dialog to update the content of that file.
- Users can search files in a folder (current directory or children directories) with file name or content.
- The lock button blurs and locks the screen, which can only be unlocked after the correct pin is entered. When the application is opened for the first time, the screen is locked by default.
> Since this is a frontend-only website, the contents behind the lock screen CAN be accessed without entering the PIN by manipulating the browser DOM.

#### Features:

1. **Responsive layout for desktop 1366px to 2048px**
    - The website is currently NOT responsive for mobile devices.

2. **File/Folder modal dropdown**
    - The modal that shows create "File or Folder" option.

3. **Breadcrumbs**
    - Breadcrumbs for navigating between the directories.

4. **File/Folder modal**
    - Custom modal for creating and specifying the file/folder name.

5. **Lock modal with good UX**
    - Custom lock modal with PIN input and blurred overlay.

6. **Expandable dynamic Sidebar**
    - Resizable siderbar for navigating.

7. **Search files with name and content**
    - Search file down the current directory by filename/file content.

## 🖼 Website Images

Entering the PIN.
![image](https://user-images.githubusercontent.com/55903466/142916270-5ab8f13b-3be0-48a7-b9ad-444793bfac48.png)

Creating a file.
![image](https://user-images.githubusercontent.com/55903466/142916656-569cc9f8-b3df-4dd4-b223-514d8f7b0d7f.png)

Editing a file.
![image](https://user-images.githubusercontent.com/55903466/142916729-f785f0eb-1c3f-4d61-b3a2-bd10f97e4cda.png)

Searching a file inside /Instruments.
![image](https://user-images.githubusercontent.com/55903466/142916826-382f47b5-9bd4-462a-9f50-e6fc5d283e88.png)


## ▶ Run the project locally

### 1. Clone the `ExplorerXT` repository
```
git clone https://github.com/Aihab1/ExplorerXT.git
# cd into the project directory and refer .env.example file to create your own .env file for storing environment variables. Please make sure you complete this step before running the application.
```

### 2. Install package dependencies

Open a terminal to run the following commands.

**Inside the Terminal:**
```
yarn install
```

### 3. Start development servers

**Inside the Terminal**
```
yarn start
```

> The client runs on localhost:3000 by default.
