import Axios from "./serviceApi";
import { serviceAccount }  from './serviceAccount'

let createUser = (user) => {
  return Axios.post("auth/signup", user);
};

let loginUser = async (user) => {
  return Axios.post("/auth/login", user)
  .then(res => {
    serviceAccount.saveToken(res.data.token)
    serviceAccount.saveId(res.data.userId)
  })
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
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};