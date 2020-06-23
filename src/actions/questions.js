import {saveQuestion, saveQuestionAnswer} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE QUESTIONS';
export const RESET_QUESTIONS = 'RESET QUESTIONS';
export const SET_ANSWER = 'SET ANSWER';
export const ADD_QUESTION = 'ADD QUESTION';

export default function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function resetQuestions () {
  return {
    type: RESET_QUESTIONS,
  };
}

export function addQuestion (question, authedUser) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser,
  };
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState ();

    dispatch (showLoading ());

    saveQuestion ({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then (question => {
      dispatch (addQuestion (question, authedUser));
      dispatch (hideLoading ());
    });
  };
}

export function setAnswer({authedUser, qid, answer}) {
  return {
    type: SET_ANSWER,
    qid,
    authedUser,
    answer,
  };
}

export function handleSetAnswer (info) {
  return dispatch => {
    saveQuestionAnswer (info).then (() => {
      dispatch (setAnswer (info));
    });
  };
}
