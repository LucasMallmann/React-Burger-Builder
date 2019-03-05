import axios from "axios";
import * as actionTypes from "./actionTypes";

const API_KEY = "AIzaSyDgUDpHbE1xTGVFRBPU_ko3ooGT2ZTZwTU";
const AUTH_SIGN_UP_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
const AUTH_SIGN_IN_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

/**
 *
 * @param {string} token
 * @param {string} userId
 */
const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId
    }
  };
};

/**
 *
 * @param {object} error
 */
const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error: error
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

/**
 * Check the expiration time of the token
 * @param {string} expiresIn
 */
export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

/**
 *
 * @param {string} email
 * @param {string} password
 * @param {boolean} isSignUp
 */
export const authenticate = (email, password, isSignUp) => {
  return dispatch => {
    const authenticationData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = AUTH_SIGN_UP_URL;

    if (!isSignUp) {
      url = AUTH_SIGN_IN_URL;
    }

    dispatch(authStart());

    axios
      .post(url, authenticationData)
      .then(response => {
        // Store the token in LocalStorage
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
