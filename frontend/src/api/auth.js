import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/token/`, {
    username,
    password,
  });

  const { access, refresh } = response.data;

  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refreshToken");

  const response = await axios.post(
    `${BASE_URL}/token/refresh/`,
    { refresh }
  );

  localStorage.setItem("accessToken", response.data.access);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};
