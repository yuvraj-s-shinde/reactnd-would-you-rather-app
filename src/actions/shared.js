import receiveQuestions, { resetQuestions } from './questions'
import setAuthedUser, { resetAuthedUser } from './authedUser'
import { getQuestionsData } from '../utils/api'
import { showLoading, hideLoading} from 'react-redux-loading'

export default function handleInitialData (authedId) {
    return (dispatch) => {
        dispatch(showLoading())
        getQuestionsData().then(({questions}) => {
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(authedId))
            dispatch(hideLoading())
        })
    }
}

export function handleLogout () {
    return (dispatch) => {
        dispatch(resetAuthedUser())
        dispatch(resetQuestions())
    }
}

