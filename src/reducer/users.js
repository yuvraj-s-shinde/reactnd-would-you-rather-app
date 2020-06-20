import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION, SET_ANSWER } from '../actions/questions'

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION: {
            const { authedUser, question } = action
            return {
                    ...state,
                    [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat([question.id])
                }
            }
        }
        case SET_ANSWER: {
            const { authedUser, qid, answer } = action
            return {
                ...state,
                [authedUser]: {
                  ...state[authedUser],
                  answers: {
                    ...state[authedUser].answers,
                    [qid]: answer
                  }
                }
            }
        }
        default:
            return state
    }
}