import { UserActionTypes } from '../types';

import api from '../../db';

export const emailSignInStart = ({ email, password }) => async (dispatch) => {
  dispatch({ type: UserActionTypes.EMAIL_SIGN_IN_START });
  await api
    .post('/login', { email, password })
    .then((res) => dispatch(signInSuccess(res.data)))
    .catch((err) => dispatch(signInFailure(err)));
};

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signUpStart = ({
  username,
  firstName: first_name,
  lastName: last_name,
  password,
  email,
}) => async (dispatch) => {
  dispatch({ type: UserActionTypes.SIGN_UP_START });
  await api
    .post('/signup', { username, first_name, last_name, password, email })
    .then((res) => dispatch(emailSignInStart({ email, password })))
    .catch((err) => {
      dispatch(signUpFailure(err));
    });
};

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});
