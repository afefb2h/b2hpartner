import { alertConstants } from "../reducers/constants";

export const alertActions = {
  success,
  error,
  clear
};

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  console.log("eeeee", message);
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
