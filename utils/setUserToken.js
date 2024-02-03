export const setUserToken = (token) => {
  localStorage.setItem("token", token);
};

export const setCurrentLoggedInUser = (user) => {
  localStorage.setItem("user", user.username);
};
