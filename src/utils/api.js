import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getQuestionsData () {
  return Promise.all([
    _getQuestions(),
  ]).then(([questions]) => ({
    questions
  }))
}

export function getUsersData () {
  return Promise.all([
    _getUsers(),
  ]).then(([users]) => ({
    users
  }))
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}