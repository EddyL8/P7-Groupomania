import Axios from "./serviceApi";

let createUser = (user) => {
  return Axios.post("auth/signup", user);
};

let getUser = (id) => {
  return Axios.get("auth/user/" + id);
};

let getAllUsers = () => {
  return Axios.get("auth/users");
};

let updateUser = (user) => {
 return Axios.patch("auth/user/"+ user.id, user);
};

let deleteUser = (id) => {
  return Axios.delete("/auth/user/"+id)
}
export const serviceUser = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};