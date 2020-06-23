# WouldYouRather Project

This is the Would You Rather Project for Udacity's React-Redux course.
It allows user to login, view and answer polls by other user.
User can also ask new question and view leaderboard based on questions asked
and polls answered

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    └──components
        ├── App.js # This is the root of this app.
        ├── Login.js # This is the Login component to render login screen.
        ├── Home.js # This is the Home component to render answered/unanswered questions based on logged in user.
        ├── NewQuestion.js # This is the NewQuestion component to render new question screen.
        ├── Question.js # This is the Question component to render question on home page and answered/unanswered questions.
        ├── Leaderboard.js # This is the Leaderboard component to render scores of users based on answered and created questions.
        ├── Nav.js # This is the Nav component to render the navigation panel and logged in user info.
    └──actions
        ├── authedUser.js # These are actions to update the authedUser in store.
        ├── questions.js # These are actions to update the questions in store.
        ├── shared.js # These are shared actions
        ├── users.js # These are actions to update the users in store.
    └──middleware
        ├── index.js # This is combined middleware including thunk middleware and logger middleware.
        ├── logger.js # This is middleware to log the action and new state.
    └──reducer
        ├── authedUser.js # This is reducer to update the authedUser in store.
        ├── questions.js # This is reducer to update the questions in store.
        ├── index.js # Thesis combined reducer combining all reducers.
        ├── users.js # Theis is reducer to update the users in store.
    └──utils
        ├── _DATA_.js # This is the backend server with backend data and metohds to access/update the data.
        ├── api.js # These are api wrappers to call the backend methods.
        ├── helpers.js # These are helper methods to format date and question.        
    ├── App.css # Styles for this app.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── index.css # Global styles.
    └── index.js
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`_DATA_.js`](utils/_DATA.js) contains the methods you will need to perform necessary operations on the backend:

* [`_getUsers`](#_getUsers)
* [`_getQuestions`](#_getQuestions)
* [`_saveQuestion`](#_saveQuestion)
* [`_saveQuestionAnswer`](#_saveQuestionAnswer)

### `_getUsers`

Method Signature:

```js
_getUsers()
```

* Returns a Promise which resolves to a JSON object containing a collection of users.

### `_getQuestions`

Method Signature:

```js
_getQuestions()
```

* Returns a Promise which resolves to a JSON object containing a collection of questions.

### `_saveQuestion`

Method Signature:

```js
_saveQuestion(question)
```

* question: `<Object>` object containing specific question data
* Returns a Promise which resolves to a JSON object representing the saved question.

### `_saveQuestionAnswer`

Method Signature:

```js
_saveQuestionAnswer({ authedUser, qid, answer })
```

* authedUser: `<String>` id of the logged in user
* qid: `<String>` question id
* answer: `<String>` answer given by the logged in user
* Returns a Promise which resolves to a empty response on saving the users response for a question.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

