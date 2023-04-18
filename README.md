# POSITIVE THINKER - full stack

> :warning: One of my very early projects completed during my front-end and basic JavaScript learning. Since that time, I have gained a lot of skills, and today it would look completely different :see_no_evil: I leave the code in the repository as a trace of my learning process from 2020 for comparison with current projects.

### Single Page App, Full Stack, Responsive Web Design.
The main goal of the project was to quickly create a fully functional (full stack) and ready to use application. To achieve this, I used the library of ready-made components (Material UI) and Firebase for app's back end. There was a need of Material UI customization with own styles. The attitude like this mede possible to achive the goal with not many working hours.

All posts and comments are saved in the Firebase database. Photos are saved in Firebase Storage. User can display a wall view with all posts as well as own posts or added to favorites ones in different views. Comment are hidden by default and can be open in accordion style. Long comments are displayied as their short versions and can they be roll out on demand. Posts can collect hearts (likes) from other users. User can delete only his own posts.

For authentication Firebase Auth was used but to enable you an easy test of the app, there is no need to sign up with real e-mail address because no confirmation is required. Users data is safe due to use of Firebase.

The design is simple, alludes to positive feelings thanks to colors. The user interface is intuitive - icons and hidden menu-bar with descriptions.

### Live app:
https://zealous-mccarthy-a4e6d9.netlify.app

------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
