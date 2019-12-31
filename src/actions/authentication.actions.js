import { authenticationConstants } from "../reducers/constants";
import { AuthenticationService } from "../services/authentication-service";
import { alertActions } from "./";
import history from "../utils/history";

export const authenticationActions = {
  login,
  logout
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    AuthenticationService.login(username, password).then(
      response => {
        if (response.status === 200 || response.status === 201) {
          const data = response.data;
          if (data.code && (data.code === 200 || data.code === 201)) {
            const user = data.response.chauffeur;
            user["token"] = data.response.value;
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(success(user));
            history.push("/driver-dashboard");
          } else {
            const error = data.message;
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        } else {
          const error = "Erreur de connexion";
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: authenticationConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authenticationConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authenticationConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  AuthenticationService.logout();
  setTimeout(() => {
    history.push("/login");
  }, 1);
  return { type: authenticationConstants.LOGOUT };
}
