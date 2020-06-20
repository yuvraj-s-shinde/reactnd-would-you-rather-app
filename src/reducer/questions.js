import { RECEIVE_QUESTIONS, ADD_QUESTION, SET_ANSWER, RESET_QUESTIONS } from '../actions/questions'

export default function tweets (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const { question } = action

            return {
                ...state,
                [question.id]: question
            }
        case SET_ANSWER:
            const { authedUser, qid, answer } = action

            return {
                ...state,
                [qid]: {
                  ...state[qid],
                  [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                  }
                }
              }
        case RESET_QUESTIONS:
            return {}
        default:
            return state
    }
}