import Axios from "./serviceApi";

let saveAdminStatus = (adminStatus) => {
  localStorage.setItem("isAdmin", adminStatus);
}

let getAdminStatus = () => {
  return JSON.parse(localStorage.getItem("isAdmin"));
}

let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("isAdmin");
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

/*let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token; 
};*/

export const serviceAccount = {
  saveAdminStatus,
  getAdminStatus,
  logout,
  getToken,
  saveToken,
  saveId,
  getId,
  //isLogged,
};