export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { "X-Auth-Token": user.token };
  } else {
    return {};
  }
}
