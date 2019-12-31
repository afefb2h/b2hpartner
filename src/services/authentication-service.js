import axios from "axios";

export const AuthenticationService = {
  login,
  logout,
  setUserLoggedIn
};
async function login(email, password) {
  const data = {
    login: email,
    password: password
  };

  return await axios.post(
    `${process.env.REACT_APP_API_VITRINE_URL}loginChauffeur`,
    data
  );
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function setUserLoggedIn(userData) {
  localStorage.setItem("user", JSON.stringify(userData));
}
