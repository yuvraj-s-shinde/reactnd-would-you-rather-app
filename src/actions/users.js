import {getUsersData} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading';

export const RECEIVE_USERS = 'RECEIVE USERS';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export default function handleUsersData () {
  return dispatch => {
    dispatch (showLoading ());
    getUsersData ().then (({users}) => {
      dispatch (receiveUsers (users));
      dispatch (hideLoading ());
    });
  };
}
