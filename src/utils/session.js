export const clearSessionMessage = () => {
  localStorage.removeItem("session");
};

export const hasSessionStorage = () => {
  return localStorage.getItem("session");
};

export const getSessionStorage = () => {
  return JSON.parse(localStorage.getItem("session"));
};

export const setSessionStorage = (data) => {
  localStorage.setItem("session", JSON.stringify({ ...data, state: 0 }));
};

export const changeStateSession = (state) => {
  const session = JSON.parse(localStorage.getItem("session"));
  session.state = state;
  localStorage.setItem("session", JSON.stringify(session));
};
