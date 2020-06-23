export const SET_AUTHED_USER = 'SET AUTHED USER';
export const RESET_AUTHED_USER = 'RESET AUTHED USER';

export default function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function resetAuthedUser () {
  return {
    type: RESET_AUTHED_USER,
  };
}
