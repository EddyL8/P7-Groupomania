import Axios from "./serviceApi";

let isAdmin = false

let saveAdminStatus = (adminStatus) => {
  isAdmin = adminStatus;
}

let getAdminStatus = () => {
  return isAdmin;
}

let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  isAdmin = false;
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

let getId= () => {
  return localStorage.getItem("userId");
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token; 
};

export const serviceAccount = {
  saveAdminStatus,
  getAdminStatus,
  logout,
  getToken,
  saveToken,
  saveId,
  getId,
  isLogged,
};