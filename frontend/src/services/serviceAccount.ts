import Axios from "./serviceApi";

let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

let getToken = () => {
  return localStorage.getItem("token");
};

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let saveId = (id) => {
  localStorage.setItem("userId", id);
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token; 
};

export const serviceAccount = {
  logout,
  getToken,
  saveToken,
  saveId,
  isLogged,
};