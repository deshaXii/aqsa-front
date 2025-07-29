const TOKEN_KEY = "aqsa_store_token";

export const setToken = (token) => {
  console.log("setToken called with:", token);
  localStorage.setItem(TOKEN_KEY, token);
  console.log(
    "Token saved to localStorage, verifying:",
    localStorage.getItem(TOKEN_KEY)
  );
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log(
    "getToken called, returning:",
    token ? "token exists" : "no token"
  );
  return token;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
